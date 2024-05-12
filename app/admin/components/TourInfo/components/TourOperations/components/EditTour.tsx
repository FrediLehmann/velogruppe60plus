'use client';

import { useCallback, useContext, useState } from 'react';
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
  useToast
} from '@chakra-ui/react';

import { TourForm } from '@/app/admin/components';
import { TourFields } from '@/types/TourFields.types';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { Tour } from '@/types/Tours.types';
import { TrackClickEvent } from '@/components';
import { createClient } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

export default function EditTour({
  tour,
  isOpen,
  onClose
}: {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { load } = useContext(AdminTourListContext);

  const supabaseClient = createClient();
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

      toast({
        title: 'Tour gespeichert.',
        description: 'Ihre Tour wurde gespeichert.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      revalidatePath('/alle-touren');
      revalidatePath('/print');
      revalidatePath(`/tour/${tour.id}`);
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
}
