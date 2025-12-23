'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { toaster } from '@/components/ui/toaster';
import { AllTourListContext } from '@/lib/contexts/AllTourListContext';
import { createClient } from '@/lib/supabase/client';
import { Tour } from '@/types/Tours.types';

export default function TourProviders({
	tours,
	totalTours,
	children
}: {
	tours: Tour[];
	totalTours: number;
	children: React.ReactNode;
}) {
	const supabase = createClient();
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get current page from URL search params
	const currentPage = parseInt(searchParams.get('page') || '1', 10);

	const [isLoading, setIsLoading] = useState(false);
	const [currentTours, setCurrentTours] = useState<Tour[]>(tours);

	// Update tours when server-provided tours change (when navigating between pages)
	useEffect(() => {
		setCurrentTours(tours);
	}, [tours]);

	const setPage = useCallback(
		(page: number) => {
			// Update URL with search parameter
			const url = page === 1 ? '/alle-touren' : `/alle-touren?page=${page}`;
			router.push(url);
		},
		[router]
	);

	// Optional: Keep client-side loading for better UX
	const load = useCallback(
		async (page: number) => {
			setIsLoading(true);
			const pageSize = 10;
			const offset = (page - 1) * pageSize;

			const { data, error } = await supabase
				.from('touren')
				.select(
					'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data'
				)
				.eq('published', true)
				.order('name')
				.range(offset, offset + pageSize - 1);

			if (error) {
				toaster.create({
					title: 'Fehler beim laden der Touren.',
					description: 'Tour konnte nicht geladen werden. Versuchen Sie es später erneut.',
					type: 'error',
					duration: 9000,
					closable: true
				});
				setIsLoading(false);
				return;
			}

			if (data) setCurrentTours(data as Tour[]);
			setIsLoading(false);
		},
		[supabase]
	);

	return (
		<AllTourListContext.Provider
			value={{
				tours: currentTours,
				page: currentPage, // Use search params
				totalTours,
				setPage,
				isLoading
			}}>
			{children}
		</AllTourListContext.Provider>
	);
}
