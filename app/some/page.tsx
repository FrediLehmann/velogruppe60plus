import { createClient } from '@/lib/supabase/client';
import { TourContextProvider } from '@/app/components/Providers';
import { CurrentTour } from '@/components';

export async function generateMetadata() {
  return {
    title: 'Velogruppe 60+ Sensetal',
    description:
      'Velogruppe 60+ Sensethal ist eine Velogruppe für Personen über 60. Wir fahren Touren im Senesetal bereich, die Teilnahme ist offen für alle.'
  };
}

export default async function Home() {
  const supabase = createClient();

  const { data: tour, error: tourError } = await supabase
    .from('touren')
    .select(
      'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data'
    )
    .eq('next_tour', true)
    .single();

  if (!tour || tourError) throw tourError;

  const { data: tourDate, error: tourDateError } = await supabase
    .from('tour_dates')
    .select('*')
    .order('tour_date')
    .limit(1)
    .single();

  if (!tourDate || tourDateError) throw tourDateError;

  return (
    <TourContextProvider tour={tour} tourDate={tourDate}>
      hello
    </TourContextProvider>
  );
}
