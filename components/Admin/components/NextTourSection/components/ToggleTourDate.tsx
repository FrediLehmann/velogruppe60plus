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
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Calendar, Slash } from 'icons';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useContext, useRef, useState } from 'react';

const ToggleTourDate = ({
  id,
  isCanceled
}: {
  id: number;
  isCanceled: boolean;
}) => {
  const { load } = useContext(AdminTourListContext);
  const supabaseClient = useSupabaseClient();
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

    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({
          secret: process.env.REGENERATE_TOKEN,
          pages: []
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
    setIsSubmitting(false);
  };

  return (
    <>
      <Button
        leftIcon={isCanceled ? <Calendar boxSize="5" /> : <Slash boxSize="5" />}
        onClick={onOpen}>
        {isCanceled ? 'Aktivieren' : 'Absagen'}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              {isCanceled ? 'Tour Aktivieren' : 'Tour Absagen'}
            </AlertDialogHeader>
            <AlertDialogBody>
              Wollen Sie die nächste Tour wirklich{' '}
              {isCanceled ? 'wieder aktivieren' : 'absagen'}?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                isLoading={isSubmitting}>
                Abbrechen
              </Button>
              <Button
                colorScheme="red"
                onClick={toggleTour}
                ml={3}
                isLoading={isSubmitting}>
                {isCanceled ? 'Aktivieren' : 'Absagen'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ToggleTourDate;
