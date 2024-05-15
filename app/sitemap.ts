import type { MetadataRoute } from 'next';

import { createClient } from '@/lib/supabase/server';

const VELOGRUPPE_URL = 'https://www.velogruppe60plus-sensetal.ch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('touren')
    .select('id, updated_at, next_tour')
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

  const nextTour = data.find(tour => tour.next_tour) || data[0];
  const allTours: {
    url: string;
    lastModified: Date;
    changeFrequency: 'monthly';
    priority: number;
  }[] = data.map(({ id, updated_at }) => ({
    url: `${VELOGRUPPE_URL}/tour/${id}`,
    lastModified: new Date(updated_at),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  return [
    {
      url: VELOGRUPPE_URL,
      lastModified: new Date(nextTour.updated_at),
      changeFrequency: 'weekly',
      priority: 1
    },
    ...allTours
  ];
}
