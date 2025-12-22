import { Button, Dialog, useDisclosure } from '@chakra-ui/react';
import { useContext, useRef, useState } from 'react';

import revalidatePaths from '@/app/admin/actions/revalidate';
import { TrackClickEvent } from '@/components';
import { toaster } from '@/components/ui/toaster';
import { Calendar, Slash } from '@/icons';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';

export default function ToggleTourDate({ id, isCanceled }: { id: number; isCanceled: boolean }) {
	const { load } = useContext(AdminTourListContext);
	const supabaseClient = createClient();
	const { open, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null!);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const toggleTour = async () => {
		setIsSubmitting(true);
		const { error } = await supabaseClient
			.from('tour_dates')
			.update({ is_canceled: !isCanceled })
			.eq('id', id);

		if (error)
			toaster.create({
				title: 'Speichern fehlgeschlagen.',
				description: 'Tourdaten konnte nicht gespeichert werden.',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top'
			});

		await revalidatePaths(['/', `/tour/${id}`]);

		onClose();
		load();
		setIsSubmitting(false);
	};

	return (
		<>
			<TrackClickEvent
				event={{ name: `${isCanceled ? 'ACTIVATE' : 'DEACTIVATE'}_TOUR` }}
				showBox={true}>
				<Button onClick={onOpen}>
					{isCanceled ? <Calendar boxSize="5" /> : <Slash boxSize="5" />}
					{isCanceled ? 'Aktivieren' : 'Absagen'}
				</Button>
			</TrackClickEvent>
			<Dialog.Root open={open} leastDestructiveRef={cancelRef} onClose={onClose}>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{isCanceled ? 'Tour Aktivieren' : 'Tour Absagen'}</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							Wollen Sie die nächste Tour wirklich {isCanceled ? 'wieder aktivieren' : 'absagen'}?
						</Dialog.Body>
						<Dialog.Footer>
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
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}
