import { createClient } from '@/lib/supabase/server';

import { AllTours, TourProviders } from './components';

export const metadata = {
  title: 'Velogruppe 60+ Sensetal | Alle Touren',
  description:
    'Tour Übersicht von Velogruppe 60+ Sensetal. Sehen Sie alle Touren die durch unsere Gruppe befahren werden.'
};

export default async function AlleTouren() {
  const supabase = createClient();

  const { error, data, count } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data',
      { count: 'exact' }
    )
    .eq('published', true)
    .order('name')
    .range(0, 9);

  if (error) throw error;
  if (data.length < 1 || (count && count < 1)) throw 'No Data received';

  return (
    <TourProviders tours={data} totalTours={count || 0}>
      <AllTours />
    </TourProviders>
  );
}
