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
import { useContext } from "react";
import { TourForm } from ".";
import { ToursContext } from "../context";

const NewTourSection = () => {
  const toast = useToast();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { load } = useContext(ToursContext);

  return (
    <>
      <Button
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
                start,
                end,
                pause,
                distance,
                ascent,
                descent,
                duration,
              }) => {
                const { error } = await supabaseClient.from("touren").insert([
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
                ]);

                if (error) {
                  toast({
                    title: "Speichern fehlgeschlagen.",
                    description: "Tour konnte nicht gespeichert werden.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top",
                  });
                  return;
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
              }}
            />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Abbrechen
              </Button>
              <Button colorScheme="blue" type="submit" form="createTour">
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
