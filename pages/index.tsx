import { PageFrame, CurrentTour, TourDate } from 'components';
import Head from 'next/head';
import { Tour } from 'types/Tours.types';
import { TourDate as TourDateType } from 'types/TourDate.types';
import { useCallback, useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { TourContext } from 'lib/contexts/TourContext';
import { createClient } from '@supabase/supabase-js';
import { Container, Divider } from '@chakra-ui/react';

export const getStaticProps = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const { data: tour, error: tourError } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data'
    )
    .eq('next_tour', true)
    .single();

  if (tourError) throw tourError;

  const { data: tourDate, error: tourDateError } = await supabase
    .from('tour_dates')
    .select('*')
    .order('tour_date')
    .limit(1)
    .single();

  if (tourDateError) throw tourDateError;

  return {
    props: { tour, tourDate }
  };
};

export default function Home({
  tour: serverTour,
  tourDate: serverTourDate
}: {
  tour: Tour;
  tourDate: TourDateType;
}) {
  const [tour, setTour] = useState(serverTour);
  const [tourDate, setTourDate] = useState(serverTourDate);
  const supabaseClient = useSupabaseClient();

  console.log(serverTourDate);

  const load = useCallback(async () => {
    const { data: tour, error: tourError } = await supabaseClient
      .from('touren')
      .select(
        'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data'
      )
      .eq('next_tour', true)
      .single();

    if (tourError) throw tourError;

    const { data: tourDate, error: tourDateError } = await supabaseClient
      .from('tour_dates')
      .select('*')
      .order('tour_date')
      .limit(1)
      .single();

    if (tourDateError) throw tourDateError;

    setTour(tour as Tour);
    setTourDate(tourDate as TourDateType);
  }, [supabaseClient]);

  useEffect(() => {
    if (!serverTour || !serverTourDate) load();
  }, [load, serverTour, serverTourDate]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal</title>
        <meta
          name="description"
          content="Velogruppe 60+ Sensethal ist eine Velogruppe für Personen über 60. Wir fahren Touren im Senesetal bereich, die Teilnahme ist offen für alle."
        />
      </Head>
      <PageFrame>
        <TourContext.Provider value={{ tour, tourDate, load }}>
          <Container as="main" maxW="container.md" mt={['4', '6', '12']}>
            <TourDate />
            <Divider my="4" />
            <CurrentTour />
          </Container>
        </TourContext.Provider>
      </PageFrame>
    </>
  );
}
