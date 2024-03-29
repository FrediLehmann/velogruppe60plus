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
  Tr,
  useToast
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { TourForm } from 'components/Admin/components';
import { TourFields } from 'types/TourFields.types';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useCallback, useContext, useState } from 'react';
import { Tour } from 'types/Tours.types';
import { TrackClickEvent } from 'components';

const EditTour = ({
  tour,
  isOpen,
  onClose
}: {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { load } = useContext(AdminTourListContext);

  const supabaseClient = useSupabaseClient();
  const toast = useToast();

  const editTour = useCallback(
    async ({
      name,
      description,
      route,
      mapLink,
      mapImage,
      mapImageData,
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
        const { error: imageRemovalError } = await supabaseClient.storage
          .from('map-images')
          .remove([tour.image_data.path]);

        if (imageRemovalError) {
          toast({
            title: 'Bild upload fehlgeschlagen.',
            description:
              'Bild konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top'
          });

          setIsSubmitting(false);
          return;
        }

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
            description:
              'Bild konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.',
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
          route,
          mapUrl: mapLink,
          image_data: {
            path: img,
            width: mapImageData.width,
            height: mapImageData.height
          },
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

      try {
        await fetch('/api/revalidate', {
          method: 'POST',
          body: JSON.stringify({
            secret: process.env.REGENERATE_TOKEN,
            pages: ['alle-touren', 'print', `tour/${tour.id}`]
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

      toast({
        title: 'Tour gespeichert.',
        description: 'Ihre Tour wurde gespeichert.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      setIsSubmitting(false);
      onClose();
      load();
    },
    [load, onClose, supabaseClient, toast, tour.id, tour.image_data.path]
  );

  return (
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
              route: tour.route,
              mapLink: tour.mapUrl,
              mapImage: tour.image_data.path,
              mapImageData: tour.image_data,
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
            <TrackClickEvent
              event={{ name: 'CANCEL_EDIT_TOUR_BUTTON_CLICK' }}
              showBox={true}>
              <Button
                disabled={isSubmitting}
                variant="outline"
                onClick={onClose}>
                Abbrechen
              </Button>
            </TrackClickEvent>
            <TrackClickEvent
              event={{ name: 'SAVE_EDIT_TOUR_BUTTON_CLICK' }}
              showBox={true}>
              <Button
                colorScheme="mapGreen"
                type="submit"
                form="editTour"
                isLoading={isSubmitting}>
                Speichern
              </Button>
            </TrackClickEvent>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTour;
