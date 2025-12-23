import { Metadata } from 'next';

import { createClient } from '@/lib/supabase/server';
import { Tour } from '@/types/Tours.types';

import { AllTours, BackToAllTours, PageContainer, PageHeader } from './components';

export const metadata: Metadata = {
	title: 'Velogruppe 60+ Sensetal | Drucken',
	description: 'Seite optimiert für den Drucker.',
	robots: {
		index: false
	}
};

export default async function Print() {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('touren')
		.select('id, name, description, route, mapUrl, startPoint, endPoint')
		.eq('published', true)
		.order('name');

	if (!data) throw new Error('No data found');
	if (error) throw error;

	return (
		<PageContainer>
			<BackToAllTours />
			<PageHeader />
			<AllTours tours={data as Tour[]} />
		</PageContainer>
	);
}
