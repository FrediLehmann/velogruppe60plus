'use client';

import { Button, ButtonGroup, Dialog, Icon, Separator } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { toaster } from '@/components/ui/toaster';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';
import { TourFields } from '@/types/TourFields.types';

import { TourForm } from '.';

export default function NewTourSection() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [open, setOpen] = useState(false);

	const supabaseClient = createClient();
	const { load } = useContext(AdminTourListContext);

	const saveNewTour = useCallback(
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

			// Save new tour
			const { data, error } = await supabaseClient
				.from('touren')
				.insert([
					{
						name,
						description,
						route,
						mapUrl: mapLink,
						startPoint: start,
						endPoint: end,
						pause,
						distance,
						ascent,
						descent,
						duration
					}
				])
				.select();

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

			// Upload image if provided
			if (mapImage && mapImage instanceof File) {
				const { data: imageData, error: imageUploadError } = await supabaseClient.storage
					.from('map-images')
					.upload(
						`${data[0].id.toString()}.${(mapImage as File).name.split('.').pop()}`,
						mapImage,
						{
							upsert: true
						}
					);

				if (imageUploadError) {
					toaster.create({
						title: 'Bild upload fehlgeschlagen.',
						description: 'Bild konnte nicht hochgeladen werden.',
						type: 'error',
						duration: 9000,
						closable: true
					});
					setIsSubmitting(false);
					return;
				}

				// Set the image info for the new tour
				await supabaseClient
					.from('touren')
					.update({
						image_data: {
							path: imageData.path,
							width: mapImageData?.width,
							height: mapImageData?.height
						}
					})
					.eq('id', data[0].id);
			}

			// Upload GPX file if provided
			if (gpxFile && gpxFile instanceof File) {
				const { data: gpxData, error: gpxUploadError } = await supabaseClient.storage
					.from('map-data')
					.upload(`${data[0].id}.gpx`, gpxFile, { upsert: true });

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

				// Update tour with GPX file path in map_data
				await supabaseClient
					.from('touren')
					.update({ map_data: { gpxPath: gpxData.path } })
					.eq('id', data[0].id);
			}

			toaster.create({
				title: 'Tour gespeichert.',
				description: 'Ihre Tour wurde gespeichert.',
				type: 'success',
				duration: 9000,
				closable: true
			});

			setIsSubmitting(false);
			setOpen(false);
			load();
		},
		[load, supabaseClient]
	);

	return (
		<>
			<Button size={['sm', 'md']} colorScheme="mapGreen" onClick={() => setOpen(true)}>
				Neue Tour erfassen
				<Icon boxSize="5">
					<FiPlus />
				</Icon>
			</Button>
			<Separator borderColor="gray.500" my="3" />
			<Dialog.Root open={open} onOpenChange={(e: { open: boolean }) => setOpen(e.open)}>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger />
						<Dialog.Header>
							<Dialog.Title>Tour erfassen</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<TourForm formName="createTour" submit={saveNewTour} />
						</Dialog.Body>
						<Dialog.Footer>
							<ButtonGroup>
								<Button disabled={isSubmitting} variant="outline" onClick={() => setOpen(false)}>
									Abbrechen
								</Button>
								<Button
									colorScheme="mapGreen"
									type="submit"
									form="createTour"
									loading={isSubmitting}>
									Speichern
								</Button>
							</ButtonGroup>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}
