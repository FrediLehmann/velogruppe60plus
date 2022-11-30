import {
  Button,
  ButtonGroup,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Plus } from "icons";
import { TourListContext } from "lib/contexts/TourListContext";
import { Tour } from "lib/types/Tours.types";
import { useCallback, useContext, useState } from "react";
import { TourForm } from ".";
import { TourFields } from "lib/types/TourFields.types";

const NewTourSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const supabaseClient = useSupabaseClient();
  const { load } = useContext(TourListContext);

  const saveNewTour = useCallback(
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
      duration,
    }: TourFields) => {
      setIsSubmitting(true);

      // Save new tour
      const { data, error } = await supabaseClient
        .from("touren")
        .insert([
          {
            name,
            description,
            mapUrl: mapLink,
            startPoint: start,
            endPoint: end,
            pause,
            distance,
            ascent,
            descent,
            duration,
          },
        ])
        .select();

      if (error) {
        toast({
          title: "Speichern fehlgeschlagen.",
          description: "Tour konnte nicht gespeichert werden.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setIsSubmitting(false);
        return;
      }

      // Upload image
      const { data: imageData, error: imageUploadError } =
        await supabaseClient.storage
          .from("map-images")
          .upload(
            `${(data[0] as Tour).id.toString()}.${(mapImage as File).name
              .split(".")
              .pop()}`,
            mapImage,
            { upsert: true }
          );

      if (imageUploadError) {
        toast({
          title: "Bild upload fehlgeschlagen.",
          description: "Bild konnte nicht hochgeladen werden.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setIsSubmitting(false);
        return;
      }

      // Set the image info for the new tour
      await supabaseClient
        .from("touren")
        .update({ image: imageData.path })
        .eq("id", (data[0] as unknown as Tour).id);

      toast({
        title: "Tour gespeichert.",
        description: "Ihre Tour wurde gespeichert.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setIsSubmitting(false);
      onClose();
      load();
    },
    [load, onClose, supabaseClient, toast]
  );

  return (
    <>
      <Button
        size={["sm", "md"]}
        colorScheme="mapGreen"
        rightIcon={<Plus boxSize="5" />}
        onClick={onOpen}
      >
        Neue Tour erfassen
      </Button>
      <Divider borderColor="gray.500" my="3" />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Tour erfassen</ModalHeader>
          <ModalBody>
            <TourForm formName="createTour" submit={saveNewTour} />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                disabled={isSubmitting}
                variant="outline"
                onClick={onClose}
              >
                Abbrechen
              </Button>
              <Button
                colorScheme="mapGreen"
                type="submit"
                form="createTour"
                isLoading={isSubmitting}
              >
                Speichern
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewTourSection;
