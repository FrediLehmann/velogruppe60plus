import { PageFrame, CurrentTour } from 'components';
import Head from 'next/head';
import { Tour } from 'types/Tours.types';
import { useCallback, useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { TourContext } from 'lib/contexts/TourContext';
import { createClient } from '@supabase/supabase-js';

export const getStaticProps = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const { data } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image'
    )
    .eq('next_tour', true)
    .single();

  return {
    props: { tour: data }
  };
};

export default function Home({ tour: serverTour }: { tour: Tour }) {
  const [tour, setTour] = useState(serverTour);
  const supabaseClient = useSupabaseClient();

  const load = useCallback(async () => {
    const { data } = await supabaseClient
      .from('touren')
      .select(
        'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image'
      )
      .eq('next_tour', true)
      .single();

    setTour(data as Tour);
  }, [supabaseClient]);

  useEffect(() => {
    if (!serverTour) load();
  }, [load, serverTour]);

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
        <TourContext.Provider value={{ tour, load }}>
          <CurrentTour />
        </TourContext.Provider>
      </PageFrame>
    </>
  );
}
