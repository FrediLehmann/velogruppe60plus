'use client';

import { Button, Dialog } from '@chakra-ui/react';
import { useContext } from 'react';

import revalidatePaths from '@/app/admin/actions/revalidate';
import { toaster } from '@/components/ui/toaster';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';

export default function DeleteTour({
	id,
	name,
	image_data,
	isOpen,
	onClose
}: {
	id: number;
	name: string;
	image_data: { path: string; height: number; width: number };
	isOpen: boolean;
	onClose: () => void;
}) {
	const { load } = useContext(AdminTourListContext);

	const supabaseClient = createClient();

	const deleteTour = async () => {
		await supabaseClient.storage.from('map-images').remove([image_data.path]);
		const { error } = await supabaseClient.from('touren').delete().eq('id', id);

		if (error)
			toaster.create({
				title: 'Fehler beim löschen der Tour.',
				description: 'Tour konnte nicht gelöscht werden. Versuchen Sie es später erneut.',
				type: 'error',
				duration: 9000,
				closable: true
			});

		await revalidatePaths(['/alle-touren', '/print']);

		onClose();
		load();
	};

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(e: { open: boolean }) => !e.open && onClose()}
			role="alertdialog">
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header fontSize="lg" fontWeight="bold">
						<Dialog.Title>Tour löschen</Dialog.Title>
					</Dialog.Header>
					<Dialog.Body>Soll die Tour &quot;{name}&quot; gelöscht werden?</Dialog.Body>
					<Dialog.Footer>
						<Button onClick={onClose}>Abbrechen</Button>
						<Button colorScheme="red" onClick={deleteTour} ml={3}>
							Löschen
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
