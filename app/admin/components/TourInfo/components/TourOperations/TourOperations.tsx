'use client';

import { Button, Icon, Menu } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FiChevronDown, FiEdit, FiEye, FiEyeOff, FiTarget, FiTrash2 } from 'react-icons/fi';

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
					<Icon boxSize="5">
						<FiChevronDown />
					</Icon>
				</Menu.Trigger>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item
							value="next_tour"
							disabled={tour.next_tour || !tour.published}
							onClick={() => setNextTour(tour.id)}>
							<Icon boxSize="5">
								<FiTarget />
							</Icon>
							Als nächste Tour festlegen
						</Menu.Item>
						{!tour.published && (
							<Menu.Item value="publish" onClick={() => setPublished(tour.id, true)}>
								<Icon boxSize="5">
									<FiEye />
								</Icon>
								Veröffentlichen
							</Menu.Item>
						)}
						{tour.published && (
							<Menu.Item
								value="unpublish"
								onClick={() => setPublished(tour.id, false)}
								disabled={tour.next_tour}>
								<Icon boxSize="5">
									<FiEyeOff />
								</Icon>
								Veröffentlichung aufheben
							</Menu.Item>
						)}
						<Menu.Item value="edit" onClick={() => setEditIsOpen(true)}>
							<Icon boxSize="5">
								<FiEdit />
							</Icon>
							Bearbeiten
						</Menu.Item>
						<Menu.Item
							value="delete"
							disabled={tour.next_tour}
							onClick={() => setDeleteIsOpen(true)}>
							<Icon boxSize="5">
								<FiTrash2 />
							</Icon>
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
