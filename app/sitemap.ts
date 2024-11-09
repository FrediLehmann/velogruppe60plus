import type { MetadataRoute } from 'next';

import { createClient } from '@/lib/supabase/server';

const VELOGRUPPE_URL = 'https://www.velogruppe60plus-sensetal.ch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('touren')
		.select('id, created_at, updated_at, next_tour')
		.eq('published', true);

	if (!data || error) {
		return [
			{
				url: VELOGRUPPE_URL,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 1
			}
		];
	}

	const nextTour = data.find((tour) => tour.next_tour) || data[0];
	const allTours: {
		url: string;
		lastModified: Date;
		changeFrequency: 'monthly';
		priority: number;
	}[] = data.map(({ id, created_at, updated_at }) => ({
		url: `${VELOGRUPPE_URL}/tour/${id}`,
		lastModified: updated_at ? new Date(updated_at) : new Date(created_at as string),
		changeFrequency: 'monthly',
		priority: 0.8
	}));

	return [
		{
			url: VELOGRUPPE_URL,
			lastModified: nextTour.updated_at
				? new Date(nextTour.updated_at)
				: new Date(nextTour.created_at as string),
			changeFrequency: 'weekly',
			priority: 1
		},
		...allTours
	];
}
