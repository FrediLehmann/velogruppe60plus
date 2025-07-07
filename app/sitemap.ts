import type { MetadataRoute } from 'next';

import { createClient } from '@/lib/supabase/server';

const VELOGRUPPE_URL = 'https://www.velogruppe60plus-sensetal.ch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const supabase = await createClient();

	const { data, error, count } = await supabase
		.from('touren')
		.select('id, created_at, updated_at, next_tour', { count: 'exact' })
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

	// Individual tour pages
	const allTours: MetadataRoute.Sitemap = data.map(({ id, created_at, updated_at }) => ({
		url: `${VELOGRUPPE_URL}/tour/${id}`,
		lastModified: updated_at ? new Date(updated_at) : new Date(created_at as string),
		changeFrequency: 'monthly',
		priority: 0.8
	}));

	// Paginated tour listing pages
	const totalTours = count || 0;
	const totalPages = Math.ceil(totalTours / 10);
	const paginatedPages: MetadataRoute.Sitemap = Array.from({ length: totalPages }, (_, i) => ({
		url: `${VELOGRUPPE_URL}/alle-touren${i > 0 ? `?page=${i + 1}` : ''}`,
		lastModified: new Date(),
		changeFrequency: 'weekly',
		priority: i === 0 ? 0.9 : 0.7
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
		...paginatedPages,
		...allTours
	];
}
