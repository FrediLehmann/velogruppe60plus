import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { TourForm } from 'components/Admin/components';
import { TourFields } from 'types/TourFields.types';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useCallback, useContext, useState } from 'react';
import { Tour } from 'types/Tours.types';

const EditTour = (tour: Tour) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { load } = useContext(AdminTourListContext);

  const supabaseClient = useSupabaseClient();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const editTour = useCallback(
    async ({
      name,
      description,
      mapLink,
      mapImage,
      start,
      end,
      pause,
      distance,
      ascent,
      descent,
      duration
    }: TourFields) => {
      setIsSubmitting(true);

      let img = mapImage;
      if (typeof mapImage !== 'string') {
        const { data, error: imageUploadError } = await supabaseClient.storage
          .from('map-images')
          .upload(
            `${tour.id.toString()}.${mapImage.name.split('.').pop()}`,
            mapImage,
            { upsert: true }
          );

        if (imageUploadError) {
          toast({
            title: 'Bild upload fehlgeschlagen.',
            description: 'Bild konnte nicht hochgeladen werden.',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top'
          });
          setIsSubmitting(false);
          return;
        }

        img = data.path;
      }

      const { error } = await supabaseClient
        .from('touren')
        .update({
          name,
          description,
          mapUrl: mapLink,
          image: img,
          startPoint: start,
          endPoint: end,
          pause,
          distance,
          ascent,
          descent,
          duration
        })
        .eq('id', tour.id);

      if (error) {
        toast({
          title: 'Speichern fehlgeschlagen.',
          description: 'Tour konnte nicht gespeichert werden.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: 'Tour gespeichert.',
        description: 'Ihre Tour wurde gespeichert.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
      load();
      setIsSubmitting(false);
      onClose();
    },
    [load, onClose, supabaseClient, toast, tour.id]
  );

  return (
    <>
      <Button onClick={onOpen}>Bearbeiten</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Tour bearbeiten</ModalHeader>
          <ModalBody>
            <TourForm
              formName="editTour"
              initialValues={{
                name: tour.name,
                description: tour.description,
                mapLink: tour.mapUrl,
                mapImage: tour.image,
                distance: tour.distance,
                ascent: tour.ascent,
                descent: tour.descent,
                duration: tour.duration,
                start: tour.startPoint,
                end: tour.endPoint,
                pause: tour.pause
              }}
              submit={editTour}
            />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                disabled={isSubmitting}
                variant="outline"
                onClick={onClose}>
                Abbrechen
              </Button>
              <Button
                colorScheme="mapGreen"
                type="submit"
                form="editTour"
                isLoading={isSubmitting}>
                Speichern
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTour;
