import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronDown, Delete, Edit, Eye, EyeOff, Target } from 'icons';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useContext } from 'react';
import { Tour } from 'types/Tours.types';
import { DeleteTour, EditTour } from './components';

const TourOperations = ({ tour }: { tour: Tour }) => {
  const { setNextTour, setPublished } = useContext(AdminTourListContext);
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose
  } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose
  } = useDisclosure();

  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDown />} mt="4">
          Änderungen vornehemen
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<Target boxSize="5" />}
            isDisabled={tour.next_tour || !tour.published}
            onClick={() => setNextTour(tour.id)}>
            Als nächste Tour festlegen
          </MenuItem>
          {!tour.published && (
            <MenuItem
              icon={<Eye boxSize="5" />}
              onClick={() => setPublished(tour.id, true)}>
              Veröffentlichen
            </MenuItem>
          )}
          {tour.published && (
            <MenuItem
              icon={<EyeOff boxSize="5" />}
              onClick={() => setPublished(tour.id, false)}
              isDisabled={tour.next_tour}>
              Veröffentlichung aufheben
            </MenuItem>
          )}
          <MenuItem icon={<Edit boxSize="5" />} onClick={editOnOpen}>
            Bearbeiten
          </MenuItem>
          <MenuItem
            icon={<Delete boxSize="5" />}
            isDisabled={tour.next_tour}
            onClick={deleteOnOpen}>
            Löschen
          </MenuItem>
        </MenuList>
      </Menu>
      <EditTour tour={tour} isOpen={editIsOpen} onClose={editOnClose} />
      <DeleteTour {...tour} isOpen={deleteIsOpen} onClose={deleteOnClose} />
    </>
  );
};

export default TourOperations;
