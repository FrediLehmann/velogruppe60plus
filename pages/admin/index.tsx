import { useToast } from '@chakra-ui/react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Admin as AdminContent, PageFrame } from 'components';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { Tour } from 'types/Tours.types';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { TourDate } from 'types/TourDate.types';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };

  const {
    error: toursError,
    data: tours,
    count: toursCount
  } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data, published',
      { count: 'exact' }
    )
    .order('name')
    .range(0, 9);

  if (toursError) throw toursError;
  if (tours.length < 1 || (toursCount && toursCount < 1))
    throw 'No Data received';

  const { error: tourDateError, data: tourDate } = await supabase
    .from('tour_dates')
    .select('*')
    .order('tour_date')
    .limit(1)
    .single();

  if (tourDateError) throw tourDateError;

  return {
    props: {
      tours,
      toursCount,
      tourDate,
      page: 1
    }
  };
};

const Admin = ({
  tours: serverTours,
  toursCount,
  tourDate: serverTourDate,
  page: serverPage
}: {
  tours: Tour[];
  toursCount: number;
  tourDate: TourDate;
  page: number;
}) => {
  const toast = useToast();
  const supabaseClient = useSupabaseClient();
  const [tours, setTours] = useState(serverTours);
  const [tourDate, setTourDate] = useState(serverTourDate);
  const [page, setPage] = useState(serverPage);

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

    const { error: toursError, data: tours } = await supabaseClient
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

    const { error: tourDateError, data: tourDate } = await supabaseClient
      .from('tour_dates')
      .select('*')
      .order('tour_date')
      .limit(1)
      .single();

    if (tourDateError) throw tourDateError;

    if (tourDate) setTourDate(tourDate);
  }, [page, supabaseClient, toast]);

  const setNextTour = useCallback(
    async (id: number) => {
      const activeNextTourId = await supabaseClient
        .from('touren')
        .select('id')
        .eq('next_tour', true)
        .single();

      const { error } = await supabaseClient
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
        const { error: nextTourError } = await supabaseClient
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

      fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({
          secret: process.env.REGENERATE_TOKEN,
          pages: ['alle-touren']
        })
      });

      toast({
        title: 'Nächste Tour festgelegt.',
        description: 'Die nächste Tour wurde erfolgreich festgelegt.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      load();
    },
    [load, supabaseClient, toast]
  );

  const setPublished = useCallback(
    async (id: number, published: boolean) => {
      const { error } = await supabaseClient
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

      const pagesToRevalidate = ['alle-touren', 'print'];
      if (published) pagesToRevalidate.push(`tour/${id}`);
      fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({
          secret: process.env.REGENERATE_TOKEN,
          pages: pagesToRevalidate
        })
      });

      toast({
        title: 'Veröffentlichung geändert.',
        description: 'Der Veröffentlichungsstatus wurde erfolgreich geändert.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      load();
    },
    [load, supabaseClient, toast]
  );

  useEffect(() => {
    if (!serverTours) load();
  }, [serverTours, load]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Admin</title>
        <meta name="robots" content="noindex"></meta>
        <meta name="description" content="Admin bereich" />
      </Head>
      <PageFrame>
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
          <AdminContent />
        </AdminTourListContext.Provider>
      </PageFrame>
    </>
  );
};

export default Admin;
