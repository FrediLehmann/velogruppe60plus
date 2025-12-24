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
			gpxFile,
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
			let imageDataToSave = tour.image_data;

			if (!mapImage && tour.image_data?.path) {
				const { error: imageRemovalError } = await supabaseClient.storage
					.from('map-images')
					.remove([tour.image_data.path]);

				if (imageRemovalError) {
					toaster.create({
						title: 'Bild löschen fehlgeschlagen.',
						description: 'Bild konnte nicht gelöscht werden.',
						type: 'error',
						duration: 9000,
						closable: true
					});

					setIsSubmitting(false);
					return;
				}

				img = undefined;
				imageDataToSave = undefined;
			} else if (mapImage && typeof mapImage !== 'string') {
				if (tour.image_data?.path) {
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
				imageDataToSave = {
					path: data.path,
					width: mapImageData?.width || 0,
					height: mapImageData?.height || 0
				};
			}

			let mapData = tour.map_data;
			if (!gpxFile && tour.map_data?.gpxPath) {
				const { error: gpxRemovalError } = await supabaseClient.storage
					.from('map-data')
					.remove([tour.map_data.gpxPath]);

				if (gpxRemovalError) {
					toaster.create({
						title: 'GPX löschen fehlgeschlagen.',
						description: 'GPX-Datei konnte nicht gelöscht werden.',
						type: 'error',
						duration: 9000,
						closable: true
					});
					setIsSubmitting(false);
					return;
				}

				mapData = null;
			} else if (gpxFile && gpxFile instanceof File) {
				if (tour.map_data?.gpxPath) {
					await supabaseClient.storage.from('map-data').remove([tour.map_data.gpxPath]);
				}

				const { data: gpxData, error: gpxUploadError } = await supabaseClient.storage
					.from('map-data')
					.upload(`${tour.id}.gpx`, gpxFile, { upsert: true });

				if (gpxUploadError) {
					toaster.create({
						title: 'GPX upload fehlgeschlagen.',
						description: 'GPX-Datei konnte nicht hochgeladen werden.',
						type: 'error',
						duration: 9000,
						closable: true
					});
					setIsSubmitting(false);
					return;
				}

				mapData = { gpxPath: gpxData.path };
			}

			const { error } = await supabaseClient
				.from('touren')
				.update({
					name,
					description,
					route,
					mapUrl: mapLink || null,
					image_data: imageDataToSave as Json,
					map_data: mapData as Json,
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
		[load, onClose, supabaseClient, tour.id, tour.image_data, tour.map_data]
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
								mapImage: tour.image_data?.path || '',
								mapImageData: tour.image_data || { width: 0, height: 0 },
								gpxFile: tour.map_data?.gpxPath || '',
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
