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
import { Tour } from "lib/types/tours.type";
import { useContext, useState } from "react";
import { TourForm } from ".";
import { ToursContext } from "../context";

const NewTourSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { load } = useContext(ToursContext);

  return (
    <>
      <Button
        size={["sm", "md"]}
        colorScheme="blue"
        rightIcon={<Plus boxSize="5" />}
        onClick={onOpen}
      >
        Neue Tour erfassen
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Tour erfassen</ModalHeader>
          <ModalBody>
            <TourForm
              formName="createTour"
              submit={async ({
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
              }) => {
                setIsSubmitting(true);

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

                if (data && data.length > 0) {
                  const { data: imageData, error: imageUploadError } =
                    await supabaseClient.storage
                      .from("map-images")
                      .upload(
                        `${(data[0] as Tour).id.toString()}.${(
                          mapImage as File
                        ).name
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

                  await supabaseClient
                    .from("touren")
                    .update({ image: imageData.path })
                    .eq("id", (data[0] as unknown as Tour).id);
                }

                toast({
                  title: "Tour gespeichert.",
                  description: "Ihre Tour wurde gespeichert.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top",
                });
                load();
                onClose();
                setIsSubmitting(false);
              }}
            />
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
                colorScheme="blue"
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
      <Divider borderColor="gray.500" my="3" />
    </>
  );
};

export default NewTourSection;
