import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { PageFrame, Tour as CurrentTour } from 'components';
import { TourContext } from 'lib/contexts/TourContext';
import { Tour as TourType } from 'types/Tours.types';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export async function getStaticProps(ctx: GetServerSidePropsContext) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  if (!ctx?.params?.id) throw 'No Id defined';

  const { error, data } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data'
    )
    .eq('id', ctx?.params?.id)
    .single();

  if (error) throw error;

  return {
    props: { tour: data, id: ctx?.params?.id }
  };
}

export async function getStaticPaths() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const { data } = await supabase
    .from('touren')
    .select('id')
    .eq('published', true);

  const paths = data?.map(tour => ({ params: { id: tour.id.toString() } }));

  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export default function Tour({
  tour: serverTour,
  id
}: {
  tour: TourType;
  id: number;
}) {
  const supabaseClient = useSupabaseClient();
  const [tour, setTour] = useState(serverTour);

  const load = useCallback(async () => {
    const { data } = await supabaseClient
      .from('touren')
      .select(
        'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data'
      )
      .eq('id', id)
      .single();

    setTour(data as TourType);
  }, [id, supabaseClient]);

  useEffect(() => {
    if (!serverTour) load();
  }, [load, serverTour]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Tourdetails</title>
        <meta name="description" content={tour.description} />
      </Head>
      <PageFrame>
        <TourContext.Provider value={{ tour, load }}>
          <CurrentTour />
        </TourContext.Provider>
      </PageFrame>
    </>
  );
}
