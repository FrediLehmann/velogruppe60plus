import { useToast } from '@chakra-ui/react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Admin as AdminContent, PageFrame } from 'components';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { Tour } from 'types/Tours.types';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { MainTourQuery } from 'lib/constants/queries';

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

  return {
    props: {}
  };
};

const Admin = () => {
  const supabaseClient = useSupabaseClient();
  const toast = useToast();

  const [tours, setTours] = useState<Tour[] | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabaseClient
      .from('touren')
      .select(`${MainTourQuery}, published`)
      .order('name');

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
  }, [supabaseClient, toast]);

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

      // revalidate pages
      fetch(
        `/api/revalidate?secret=${process.env.REGENERATE_TOKEN}&pages=,alle-touren`
      );

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
    [load, supabaseClient, toast, tours]
  );

  const setPublished = useCallback(async (id: number, published: boolean) => {
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

    // revalidate pages
    fetch(
      `/api/revalidate?secret=${process.env.REGENERATE_TOKEN}&pages=${
        published ? `tour/${id},` : ''
      }alle-touren,print`
    );

    toast({
      title: 'Veröffentlichung geändert.',
      description: 'Der Veröffentlichungsstatus wurde erfolgreich geändert.',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top'
    });

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Admin</title>
        <meta name="robots" content="noindex"></meta>
        <meta name="description" content="Admin bereich" />
      </Head>
      <PageFrame>
        <AdminTourListContext.Provider
          value={{ tours: tours || [], load, setNextTour, setPublished }}>
          <AdminContent />
        </AdminTourListContext.Provider>
      </PageFrame>
    </>
  );
};

export default Admin;
