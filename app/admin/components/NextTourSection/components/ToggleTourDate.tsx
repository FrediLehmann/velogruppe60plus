import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure,
	useToast
} from '@chakra-ui/react';
import { revalidatePath } from 'next/cache';
import { useContext, useRef, useState } from 'react';

import { TrackClickEvent } from '@/components';
import { Calendar, Slash } from '@/icons';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';

export default function ToggleTourDate({ id, isCanceled }: { id: number; isCanceled: boolean }) {
	const { load } = useContext(AdminTourListContext);
	const supabaseClient = createClient();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const toggleTour = async () => {
		setIsSubmitting(true);
		const { error } = await supabaseClient
			.from('tour_dates')
			.update({ is_canceled: !isCanceled })
			.eq('id', id);

		if (error)
			toast({
				title: 'Speichern fehlgeschlagen.',
				description: 'Tourdaten konnte nicht gespeichert werden.',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top'
			});

		revalidatePath('/');
		revalidatePath(`/tour/${id}`);
		onClose();
		load();
		setIsSubmitting(false);
	};

	return (
		<>
			<TrackClickEvent
				event={{ name: `${isCanceled ? 'ACTIVATE' : 'DEACTIVATE'}_TOUR` }}
				showBox={true}>
				<Button
					leftIcon={isCanceled ? <Calendar boxSize="5" /> : <Slash boxSize="5" />}
					onClick={onOpen}>
					{isCanceled ? 'Aktivieren' : 'Absagen'}
				</Button>
			</TrackClickEvent>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader>{isCanceled ? 'Tour Aktivieren' : 'Tour Absagen'}</AlertDialogHeader>
						<AlertDialogBody>
							Wollen Sie die nächste Tour wirklich {isCanceled ? 'wieder aktivieren' : 'absagen'}?
						</AlertDialogBody>
						<AlertDialogFooter>
							<TrackClickEvent
								event={{
									name: `CANCEL_${isCanceled ? 'ACTIVATE' : 'DEACTIVATE'}_TOUR`
								}}>
								<Button ref={cancelRef} onClick={onClose} isLoading={isSubmitting}>
									Abbrechen
								</Button>
							</TrackClickEvent>
							<TrackClickEvent
								event={{
									name: `SAVE_${isCanceled ? 'ACTIVATE' : 'DEACTIVATE'}_TOUR`
								}}>
								<Button colorScheme="red" onClick={toggleTour} ml={3} isLoading={isSubmitting}>
									{isCanceled ? 'Aktivieren' : 'Absagen'}
								</Button>
							</TrackClickEvent>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
