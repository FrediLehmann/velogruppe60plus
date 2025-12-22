import { Button, Menu, useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';

import { ChevronDown, Delete, Edit, Eye, EyeOff, Target } from '@/icons';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { Tour } from '@/types/Tours.types';

import { DeleteTour, EditTour } from './components';

export default function TourOperations({ tour }: { tour: Tour }) {
	const { setNextTour, setPublished } = useContext(AdminTourListContext);
	const { open: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
	const { open: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();

	return (
		<>
			<Menu closeOnSelect={false}>
				<Menu.Trigger as={Button} mt="4">
					Änderungen vornehemen
					<ChevronDown />
				</Menu.Trigger>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item
							icon={<Target boxSize="5" />}
							isDisabled={tour.next_tour || !tour.published}
							onClick={() => setNextTour(tour.id)}>
							Als nächste Tour festlegen
						</Menu.Item>
						{!tour.published && (
							<Menu.Item icon={<Eye boxSize="5" />} onClick={() => setPublished(tour.id, true)}>
								Veröffentlichen
							</Menu.Item>
						)}
						{tour.published && (
							<Menu.Item
								icon={<EyeOff boxSize="5" />}
								onClick={() => setPublished(tour.id, false)}
								isDisabled={tour.next_tour}>
								Veröffentlichung aufheben
							</Menu.Item>
						)}
						<Menu.Item icon={<Edit boxSize="5" />} onClick={editOnOpen}>
							Bearbeiten
						</Menu.Item>
						<Menu.Item
							icon={<Delete boxSize="5" />}
							isDisabled={tour.next_tour}
							onClick={deleteOnOpen}>
							Löschen
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Menu>
			<EditTour tour={tour} isOpen={editIsOpen} onClose={editOnClose} />
			<DeleteTour {...tour} isOpen={deleteIsOpen} onClose={deleteOnClose} />
		</>
	);
}
