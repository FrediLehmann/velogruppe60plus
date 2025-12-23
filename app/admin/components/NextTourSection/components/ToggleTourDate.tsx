import { Button, Dialog, Icon } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FiCalendar, FiSlash } from 'react-icons/fi';

import revalidatePaths from '@/app/admin/actions/revalidate';
import { toaster } from '@/components/ui/toaster';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';

export default function ToggleTourDate({ id, isCanceled }: { id: number; isCanceled: boolean }) {
	const { load } = useContext(AdminTourListContext);
	const supabaseClient = createClient();
	const [open, setOpen] = useState(false);
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
				type: 'error',
				duration: 9000,
				closable: true
			});

		await revalidatePaths(['/', `/tour/${id}`]);

		setOpen(false);
		load();
		setIsSubmitting(false);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Icon boxSize="5">{isCanceled ? <FiCalendar /> : <FiSlash />}</Icon>
				{isCanceled ? 'Aktivieren' : 'Absagen'}
			</Button>
			<Dialog.Root open={open} onOpenChange={(e: { open: boolean }) => setOpen(e.open)}>
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
							<Button onClick={() => setOpen(false)} loading={isSubmitting}>
								Abbrechen
							</Button>
							<Button colorScheme="red" onClick={toggleTour} ml={3} loading={isSubmitting}>
								{isCanceled ? 'Aktivieren' : 'Absagen'}
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}
