import { useToast } from '@chakra-ui/react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Admin as AdminContent, PageFrame } from 'components';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { Tour } from 'types/Tours.types';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

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

  const { error, data, count } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data, published',
      { count: 'exact' }
    )
    .order('name')
    .range(0, 9);

  if (error) throw error;
  if (data.length < 1 || (count && count < 1)) throw 'No Data received';

  return {
    props: {
      tours: data,
      toursCount: count,
      page: 1
    }
  };
};

const Admin = ({
  tours: serverTours,
  toursCount,
  page: serverPage
}: {
  tours: Tour[];
  toursCount: number;
  page: number;
}) => {
  const toast = useToast();
  const supabaseClient = useSupabaseClient();
  const [tours, setTours] = useState(serverTours);
  const [page, setPage] = useState(serverPage);

  const load = useCallback(
    async (from: number, to: number) => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

      const { data, error } = await supabaseClient
        .from('touren')
        .select(
          'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data, published'
        )
        .order('name')
        .range(from, to);

      if (error) {
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

      if (data) setTours(data);
    },
    [supabaseClient, toast]
  );

  const setPageNextPage = (page: number) => {
    setPage(page);
    const p = page - 1;
    if (p === 0) {
      load(0, 9);
    } else {
      load(Number(p.toString() + 0), Number(p.toString() + 9));
    }
  };

  const setNextTour = useCallback(
    async (id: number) => {
      const activeNextTourId = tours?.find(tour => tour.next_tour)?.id;

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

      if (activeNextTourId) {
        const { error: nextTourError } = await supabaseClient
          .from('touren')
          .update({ next_tour: false })
          .eq('id', activeNextTourId);

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

      const p = page - 1;
      if (p === 0) {
        load(0, 9);
      } else {
        load(Number(p.toString() + 0), Number(p.toString() + 9));
      }
    },
    [load, supabaseClient, toast, tours, page]
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

      const p = page - 1;
      if (p === 0) {
        load(0, 9);
      } else {
        load(Number(p.toString() + 0), Number(p.toString() + 9));
      }
    },
    [load, supabaseClient, toast, page]
  );

  useEffect(() => {
    if (!serverTours) load(0, 9);
  }, [serverTours, load]);

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
            page,
            setPage: setPageNextPage,
            totalTours: toursCount,
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
