import { createClient } from '@/lib/supabase/server';

import { AdminProvider, NewTourSection, NextTourSection, Tours } from './components';

export const metadata = {
	title: 'Velogruppe 60+ Sensetal | Admin',
	description: 'Admin bereich',
	robots: {
		index: false
	}
};

export default async function Admin() {
	const supabase = createClient();

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
	if (tours.length < 1 || (toursCount && toursCount < 1)) throw 'No Data received';

	const { error: tourDateError, data: tourDate } = await supabase
		.from('tour_dates')
		.select('*')
		.order('tour_date')
		.limit(1)
		.single();

	if (tourDateError) throw tourDateError;

	return (
		<AdminProvider serverTours={tours} serverTourDate={tourDate} toursCount={toursCount || 0}>
			<NextTourSection />
			<NewTourSection />
			<Tours />
		</AdminProvider>
	);
}
