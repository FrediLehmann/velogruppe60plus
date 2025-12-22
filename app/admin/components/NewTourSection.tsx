'use client';

import { Button, ButtonGroup, Dialog, Separator, useDisclosure } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';

import { TrackClickEvent } from '@/components';
import { toaster } from '@/components/ui/toaster';
import { Plus } from '@/icons';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';
import { TourFields } from '@/types/TourFields.types';

import { TourForm } from '.';

export default function NewTourSection() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { open, onOpen, onClose } = useDisclosure();

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
					status: 'error',
					duration: 9000,
					isClosable: true,
					position: 'top'
				});
				setIsSubmitting(false);
				return;
			}

			// Upload image
			const { data: imageData, error: imageUploadError } = await supabaseClient.storage
				.from('map-images')
				.upload(`${data[0].id.toString()}.${(mapImage as File).name.split('.').pop()}`, mapImage, {
					upsert: true
				});

			if (imageUploadError) {
				toaster.create({
					title: 'Bild upload fehlgeschlagen.',
					description: 'Bild konnte nicht hochgeladen werden.',
					status: 'error',
					duration: 9000,
					isClosable: true,
					position: 'top'
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

			toaster.create({
				title: 'Tour gespeichert.',
				description: 'Ihre Tour wurde gespeichert.',
				status: 'success',
				duration: 9000,
				isClosable: true,
				position: 'top'
			});

			setIsSubmitting(false);
			onClose();
			load();
		},
		[load, onClose, supabaseClient]
	);

	return (
		<>
			<TrackClickEvent event={{ name: 'START_CREATE_NEW_TOUR_BUTTON_CLICK' }}>
				<Button size={['sm', 'md']} colorScheme="mapGreen" onClick={onOpen}>
					Neue Tour erfassen
					<Plus boxSize="5" />
				</Button>
			</TrackClickEvent>
			<Separator borderColor="gray.500" my="3" />
			<Dialog.Root>
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
								<TrackClickEvent
									event={{ name: 'ABORT_CREATING_NEW_TOUR_BUTTON_CLICK' }}
									showBox={true}>
									<Button disabled={isSubmitting} variant="outline" onClick={onClose}>
										Abbrechen
									</Button>
								</TrackClickEvent>
								<TrackClickEvent event={{ name: 'SAVE_NEW_TOUR_BUTTON_CLICK' }} showBox={true}>
									<Button
										colorScheme="mapGreen"
										type="submit"
										form="createTour"
										isLoading={isSubmitting}>
										Speichern
									</Button>
								</TrackClickEvent>
							</ButtonGroup>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}
