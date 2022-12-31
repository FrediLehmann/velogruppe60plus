import { useToast } from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AllTours, PageFrame } from 'components';
import { AllTourListContext } from 'lib/contexts/AllTourListContext';
import { Tour } from 'types/Tours.types';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export const getStaticProps = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const { data, count } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image',
      { count: 'exact' }
    )
    .order('name')
    .range(0, 9);

  return {
    props: {
      tours: data,
      toursCount: count,
      page: 1
    }
  };
};

const AlleTouren = ({
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
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState(serverTours);
  const [page, setPage] = useState(serverPage);

  const load = useCallback(
    async (from: number, to: number) => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      setLoading(true);

      const { data, error } = await supabaseClient
        .from('touren')
        .select(
          'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image'
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
        setLoading(false);
        return;
      }

      if (data) setTours(data);
      setLoading(false);
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

  useEffect(() => {
    if (!serverTours) load(0, 9);
  }, [serverTours, load]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Alle Touren</title>
      </Head>
      <PageFrame>
        <AllTourListContext.Provider
          value={{
            tours,
            page,
            setPage: setPageNextPage,
            totalTours: toursCount,
            isLoading: loading
          }}>
          <AllTours />
        </AllTourListContext.Provider>
      </PageFrame>
    </>
  );
};

export default AlleTouren;
