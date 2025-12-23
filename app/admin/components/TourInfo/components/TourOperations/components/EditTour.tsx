'use client';

import { Button, ButtonGroup, Dialog } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';

import revalidatePaths from '@/app/admin/actions/revalidate';
import { TourForm } from '@/app/admin/components';
import { toaster } from '@/components/ui/toaster';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';
import { Json } from '@/types/Database.types';
import { TourFields } from '@/types/TourFields.types';
import { Tour } from '@/types/Tours.types';

export default function EditTour({
	tour,
	isOpen,
	onClose
}: {
	tour: Tour;
	isOpen: boolean;
	onClose: () => void;
}) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { load } = useContext(AdminTourListContext);

	const supabaseClient = createClient();

	const editTour = useCallback(
		async ({
			name,
			description,
			route,
			mapLink,
			mapImage,
			mapImageData,
			start,
			end,
			pause,
			distance,
			ascent,
			descent,
			duration
		}: TourFields) => {
			setIsSubmitting(true);

			let img = mapImage;
			if (typeof mapImage !== 'string') {
				const { error: imageRemovalError } = await supabaseClient.storage
					.from('map-images')
					.remove([tour.image_data.path]);

				if (imageRemovalError) {
					toaster.create({
						title: 'Bild upload fehlgeschlagen.',
						description: 'Bild konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.',
						type: 'error',
						duration: 9000,
						closable: true
					});

					setIsSubmitting(false);
					return;
				}

				const { data, error: imageUploadError } = await supabaseClient.storage
					.from('map-images')
					.upload(`${tour.id.toString()}.${mapImage.name.split('.').pop()}`, mapImage, {
						upsert: true
					});

				if (imageUploadError) {
					toaster.create({
						title: 'Bild upload fehlgeschlagen.',
						description: 'Bild konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.',
						type: 'error',
						duration: 9000,
						closable: true
					});

					setIsSubmitting(false);
					return;
				}

				img = data.path;
			}

			const { error } = await supabaseClient
				.from('touren')
				.update({
					name,
					description,
					route,
					mapUrl: mapLink,
					image_data: {
						path: img,
						width: mapImageData.width,
						height: mapImageData.height
					} as Json,
					startPoint: start,
					endPoint: end,
					pause,
					distance,
					ascent,
					descent,
					duration
				})
				.eq('id', tour.id);

			if (error) {
				toaster.create({
					title: 'Speichern fehlgeschlagen.',
					description: 'Tour konnte nicht gespeichert werden.',
					type: 'error',
					duration: 9000,
					closable: true
				});
				setIsSubmitting(false);
				return;
			}

			toaster.create({
				title: 'Tour gespeichert.',
				description: 'Ihre Tour wurde gespeichert.',
				type: 'success',
				duration: 9000,
				closable: true
			});

			await revalidatePaths(['/alle-touren', '/print', `/tour/${tour.id}`]);

			setIsSubmitting(false);
			onClose();
			load();
		},
		[load, onClose, supabaseClient, tour.id, tour.image_data.path]
	);

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(e: { open: boolean }) => !e.open && onClose()}
			size="xl">
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.CloseTrigger />
					<Dialog.Header>
						<Dialog.Title>Tour bearbeiten</Dialog.Title>
					</Dialog.Header>
					<Dialog.Body>
						<TourForm
							formName="editTour"
							initialValues={{
								name: tour.name,
								description: tour.description,
								route: tour.route,
								mapLink: tour.mapUrl,
								mapImage: tour.image_data.path,
								mapImageData: tour.image_data,
								distance: tour.distance,
								ascent: tour.ascent,
								descent: tour.descent,
								duration: tour.duration,
								start: tour.startPoint,
								end: tour.endPoint,
								pause: tour.pause
							}}
							submit={editTour}
						/>
					</Dialog.Body>
					<Dialog.Footer>
						<ButtonGroup>
							<Button disabled={isSubmitting} variant="outline" onClick={onClose}>
								Abbrechen
							</Button>
							<Button colorScheme="mapGreen" type="submit" form="editTour" loading={isSubmitting}>
								Speichern
							</Button>
						</ButtonGroup>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
