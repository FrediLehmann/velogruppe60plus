import { createClient } from '@supabase/supabase-js';

import { createClient as createServerClient } from '@/lib/supabase/server';
import { CurrentTour, TourContextProvider } from '@/components';
import { TourDate } from '@/types/TourDate.types';

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error, data } = await supabase.from('touren').select('id');

  if (error) throw error;
  if (!data) throw 'No data';

  return data.map(({ id }: { id: number }) => ({ id: id.toString() }));
}

export async function generateMetadata({
  params: { id }
}: {
  params: { id: string };
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error, data } = await supabase
    .from('touren')
    .select('name, description')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw 'No Data';

  return {
    title: `Velogruppe 60+ Sensetal | ${data.name}`,
    description: data.description
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createServerClient();

  const { error, data } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data'
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw 'No data';

  return (
    <TourContextProvider tour={data} tourDate={{} as TourDate}>
      <CurrentTour />
    </TourContextProvider>
  );
}
