'use client';

import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

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

	const toast = useToast();

	const [isLoading, setIsLoading] = useState(false);
	const [currentTours, setCurrentTours] = useState<Tour[]>(tours);
	const [currentPage, setCurrentPage] = useState(1);

	const load = useCallback(
		async (from: number, to: number) => {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
			setIsLoading(true);

			const { data, error } = await supabase
				.from('touren')
				.select(
					'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data'
				)
				.eq('published', true)
				.order('name')
				.range(from, to);

			if (error) {
				toast({
					title: 'Fehler beim laden der Touren.',
					description: 'Tour konnte nicht geladen werden. Versuchen Sie es später erneut.',
					status: 'error',
					duration: 9000,
					isClosable: true,
					position: 'top'
				});
				setIsLoading(false);
				return;
			}

			if (data) setCurrentTours(data as Tour[]);
			setIsLoading(false);
		},
		[supabase, toast]
	);

	function setPage(page: number) {
		setCurrentPage(page);
		const p = page - 1;
		if (p === 0) {
			load(0, 9);
		} else {
			load(Number(p.toString() + 0), Number(p.toString() + 9));
		}
	}

	return (
		<AllTourListContext.Provider
			value={{
				tours: currentTours,
				page: currentPage,
				totalTours,
				setPage,
				isLoading
			}}>
			{children}
		</AllTourListContext.Provider>
	);
}
