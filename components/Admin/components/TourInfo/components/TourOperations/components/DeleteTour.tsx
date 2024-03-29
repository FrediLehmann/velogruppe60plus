import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { TrackClickEvent } from 'components';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useContext, useRef } from 'react';

const DeleteTour = ({
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
}) => {
  const cancelRef = useRef(null);
  const { load } = useContext(AdminTourListContext);

  const toast = useToast();

  const supabaseClient = useSupabaseClient();

  const deleteTour = async () => {
    await supabaseClient.storage.from('map-images').remove([image_data.path]);
    const { error } = await supabaseClient.from('touren').delete().eq('id', id);

    if (error)
      toast({
        title: 'Fehler beim löschen der Tour.',
        description:
          'Tour konnte nicht gelöscht werden. Versuchen Sie es später erneut.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({
          secret: process.env.REGENERATE_TOKEN,
          pages: ['alle-touren', 'print']
        })
      });
    } catch (err: any) {
      toast({
        title: 'Fehler beim regenerieren der Seiten.',
        description: err?.message || '',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
    }

    onClose();
    load();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Tour löschen
          </AlertDialogHeader>
          <AlertDialogBody>
            Soll die Tour &quot;{name}&quot; gelöscht werden?
          </AlertDialogBody>
          <AlertDialogFooter>
            <TrackClickEvent event={{ name: 'CANCEL_DELETE_TOUR' }}>
              <Button ref={cancelRef} onClick={onClose}>
                Abbrechen
              </Button>
            </TrackClickEvent>
            <TrackClickEvent event={{ name: 'DELETE_TOUR' }}>
              <Button colorScheme="red" onClick={deleteTour} ml={3}>
                Löschen
              </Button>
            </TrackClickEvent>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteTour;
