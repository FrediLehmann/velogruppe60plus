import { createClient } from '@supabase/supabase-js';

import { TourContextProvider } from '@/components';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { TourDate } from '@/types/TourDate.types';
import { Tour as TourType } from '@/types/Tours.types';

import { Tour } from './components';

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const supabase = await createServerClient();

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
		<TourContextProvider tour={data as TourType} tourDate={{} as TourDate}>
			<Tour />
		</TourContextProvider>
	);
}
