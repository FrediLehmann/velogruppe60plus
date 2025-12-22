'use client';

import { Button, Menu } from '@chakra-ui/react';
import { useContext, useState } from 'react';

import { ChevronDown, Delete, Edit, Eye, EyeOff, Target } from '@/icons';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { Tour } from '@/types/Tours.types';

import { DeleteTour, EditTour } from './components';

export default function TourOperations({ tour }: { tour: Tour }) {
	const { setNextTour, setPublished } = useContext(AdminTourListContext);
	const [deleteIsOpen, setDeleteIsOpen] = useState(false);
	const [editIsOpen, setEditIsOpen] = useState(false);

	return (
		<>
			<Menu.Root closeOnSelect={false}>
				<Menu.Trigger as={Button} mt="4">
					Änderungen vornehemen
					<ChevronDown />
				</Menu.Trigger>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item
							value="next_tour"
							disabled={tour.next_tour || !tour.published}
							onClick={() => setNextTour(tour.id)}>
							<Target boxSize="5" />
							Als nächste Tour festlegen
						</Menu.Item>
						{!tour.published && (
							<Menu.Item value="publish" onClick={() => setPublished(tour.id, true)}>
								<Eye boxSize="5" />
								Veröffentlichen
							</Menu.Item>
						)}
						{tour.published && (
							<Menu.Item
								value="unpublish"
								onClick={() => setPublished(tour.id, false)}
								disabled={tour.next_tour}>
								<EyeOff boxSize="5" />
								Veröffentlichung aufheben
							</Menu.Item>
						)}
						<Menu.Item value="edit" onClick={() => setEditIsOpen(true)}>
							<Edit boxSize="5" />
							Bearbeiten
						</Menu.Item>
						<Menu.Item
							value="delete"
							disabled={tour.next_tour}
							onClick={() => setDeleteIsOpen(true)}>
							<Delete boxSize="5" />
							Löschen
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Menu.Root>
			<EditTour tour={tour} isOpen={editIsOpen} onClose={() => setEditIsOpen(false)} />
			<DeleteTour {...tour} isOpen={deleteIsOpen} onClose={() => setDeleteIsOpen(false)} />
		</>
	);
}
