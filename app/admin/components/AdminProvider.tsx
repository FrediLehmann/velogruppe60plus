'use client';

import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { revalidatePath } from 'next/cache';

import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { Tour } from '@/types/Tours.types';
import { TourDate } from '@/types/TourDate.types';
import { createClient } from '@/lib/supabase/client';

export default function AdminProvider({
  serverTours,
  serverTourDate,
  toursCount,
  children
}: {
  serverTours: Tour[];
  serverTourDate: TourDate;
  toursCount: number;
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const toast = useToast();

  const [tours, setTours] = useState(serverTours);
  const [tourDate, setTourDate] = useState(serverTourDate);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    const p = page - 1;
    let from, to;
    if (p === 0) {
      from = 0;
      to = 9;
    } else {
      from = Number(p.toString() + 0);
      to = Number(p.toString() + 9);
    }

    const { error: toursError, data: tours } = await supabase
      .from('touren')
      .select(
        'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data, published'
      )
      .order('name')
      .range(from, to);

    if (toursError) {
      toast({
        title: 'Fehler beim laden der Touren.',
        description:
          'Tour konnte nicht geladen werden. Versuchen Sie es später erneut.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    if (tours) setTours(tours);

    const { error: tourDateError, data: tourDate } = await supabase
      .from('tour_dates')
      .select('*')
      .order('tour_date')
      .limit(1)
      .single();

    if (tourDateError) throw tourDateError;

    if (tourDate) setTourDate(tourDate as TourDate);
  }, [page, supabase, toast]);

  const setNextTour = useCallback(
    async (id: number) => {
      const activeNextTourId = await supabase
        .from('touren')
        .select('id')
        .eq('next_tour', true)
        .single();

      const { error } = await supabase
        .from('touren')
        .update({ next_tour: true })
        .eq('id', id);

      if (error) {
        toast({
          title: 'Fehler beim speichern der nächsten Tour.',
          description:
            'Es ist ein Fehler aufgetreten beim speichern der nächsten Tour.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        });
        return;
      }

      if (activeNextTourId?.data?.id) {
        const { error: nextTourError } = await supabase
          .from('touren')
          .update({ next_tour: false })
          .eq('id', activeNextTourId.data.id);

        if (nextTourError) {
          toast({
            title: 'Fehler beim speichern.',
            description: 'Aktuelle Tour konnte nicht entfernt werden.',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top'
          });
          return;
        }
      }

      toast({
        title: 'Nächste Tour festgelegt.',
        description: 'Die nächste Tour wurde erfolgreich festgelegt.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      load();
      revalidatePath('/');
    },
    [load, supabase, toast]
  );

  const setPublished = useCallback(
    async (id: number, published: boolean) => {
      const { error } = await supabase
        .from('touren')
        .update({ published })
        .eq('id', id);

      if (error) {
        toast({
          title: 'Fehler beim publizieren.',
          description: 'Aktuelle Tour konnte nicht Veröffentlicht werden.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        });
      }

      toast({
        title: 'Veröffentlichung geändert.',
        description: 'Der Veröffentlichungsstatus wurde erfolgreich geändert.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      load();
      revalidatePath(`/tour/${id}`);
    },
    [load, supabase, toast]
  );

  return (
    <AdminTourListContext.Provider
      value={{
        tours: tours || [],
        totalTours: toursCount,
        tourDate,
        page,
        setPage,
        load,
        setNextTour,
        setPublished
      }}>
      {children}
    </AdminTourListContext.Provider>
  );
}
