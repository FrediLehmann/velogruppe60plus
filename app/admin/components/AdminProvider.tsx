'use client';

import { useCallback, useEffect, useState } from 'react';

import { toaster } from '@/components/ui/toaster';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';
import { TourDate } from '@/types/TourDate.types';
import { Tour } from '@/types/Tours.types';

import revalidatePaths from '../actions/revalidate';

export default function AdminProvider({
	serverTours,
	serverTourDate,
	toursCount,
	children
}: {
	serverTours: Tour[];
	serverTourDate: TourDate;
	toursCount: number;
	children: React.ReactNode;
}) {
	const supabase = createClient();

	const [tours, setTours] = useState(serverTours);
	const [tourDate, setTourDate] = useState(serverTourDate);
	const [page, setPage] = useState(1);

	const load = useCallback(async () => {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

		const p = page - 1;
		let from, to;
		if (p === 0) {
			from = 0;
			to = 9;
		} else {
			from = Number(p.toString() + 0);
			to = Number(p.toString() + 9);
		}

		const { error: toursError, data: tours } = await supabase
			.from('touren')
			.select(
				'id, name, description, route, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image_data, published'
			)
			.order('name')
			.range(from, to);

		if (toursError) {
			toaster.create({
				title: 'Fehler beim laden der Touren.',
				description: 'Tour konnte nicht geladen werden. Versuchen Sie es später erneut.',
				type: 'error',
				duration: 9000,
				closable: true
			});
			return;
		}

		if (tours) setTours(tours as Tour[]);

		const { error: tourDateError, data: tourDate } = await supabase
			.from('tour_dates')
			.select('*')
			.order('tour_date')
			.limit(1)
			.single();

		if (tourDateError) throw tourDateError;

		if (tourDate) setTourDate(tourDate as TourDate);
	}, [page, supabase]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		load();
	}, [load, page]);

	const setNextTour = useCallback(
		async (id: number) => {
			const activeNextTourId = await supabase
				.from('touren')
				.select('id')
				.eq('next_tour', true)
				.single();

			const { error } = await supabase.from('touren').update({ next_tour: true }).eq('id', id);

			if (error) {
				toaster.create({
					title: 'Fehler beim speichern der nächsten Tour.',
					description: 'Es ist ein Fehler aufgetreten beim speichern der nächsten Tour.',
					type: 'error',
					duration: 9000,
					closable: true
				});
				return;
			}

			if (activeNextTourId?.data?.id) {
				const { error: nextTourError } = await supabase
					.from('touren')
					.update({ next_tour: false })
					.eq('id', activeNextTourId.data.id);

				if (nextTourError) {
					toaster.create({
						title: 'Fehler beim speichern.',
						description: 'Aktuelle Tour konnte nicht entfernt werden.',
						type: 'error',
						duration: 9000,
						closable: true
					});
					return;
				}
			}

			toaster.create({
				title: 'Nächste Tour festgelegt.',
				description: 'Die nächste Tour wurde erfolgreich festgelegt.',
				type: 'success',
				duration: 9000,
				closable: true
			});

			load();

			await revalidatePaths(['/']);
		},
		[load, supabase]
	);

	const setPublished = useCallback(
		async (id: number, published: boolean) => {
			const { error } = await supabase.from('touren').update({ published }).eq('id', id);

			if (error) {
				toaster.create({
					title: 'Fehler beim publizieren.',
					description: 'Aktuelle Tour konnte nicht Veröffentlicht werden.',
					type: 'error',
					duration: 9000,
					closable: true
				});
			}

			toaster.create({
				title: 'Veröffentlichung geändert.',
				description: 'Der Veröffentlichungsstatus wurde erfolgreich geändert.',
				type: 'success',
				duration: 9000,
				closable: true
			});

			load();

			await revalidatePaths([`/tour/${id}`]);
		},
		[load, supabase]
	);

	return (
		<AdminTourListContext.Provider
			value={{
				tours: tours || [],
				totalTours: toursCount,
				tourDate,
				page,
				setPage,
				load,
				setNextTour,
				setPublished
			}}>
			{children}
		</AdminTourListContext.Provider>
	);
}
