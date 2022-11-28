import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { External } from "icons";
import { Fact } from "components";
import { useContext, useRef } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ToursContext } from "../context";
import { TourForm } from ".";

const TourInfo = ({
  id,
  name,
  description,
  mapUrl,
  distance,
  ascent,
  descent,
  duration,
  startPoint,
  endPoint,
  pause,
}: {
  id: number;
  name: string;
  description: string;
  mapUrl: string;
  distance: string;
  ascent: string;
  descent: string;
  duration: string;
  startPoint: string;
  endPoint: string;
  pause: string;
}) => {
  const supabaseClient = useSupabaseClient();
  const {
    isOpen: isAlertOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();
  const { load } = useContext(ToursContext);

  const deleteTour = async () => {
    const { error } = await supabaseClient.from("touren").delete().eq("id", id);

    if (error)
      toast({
        title: "Fehler beim löschen der Tour.",
        description:
          "Tour konnte nicht gelöscht werden. Versuchen Sie es später erneut.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });

    load();
    alertOnClose();
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontSize="lg" fontWeight="semibold">
            {name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <NextLink href={mapUrl} passHref legacyBehavior>
          <Link
            display="block"
            my="4"
            isExternal
            color="blue.700"
            fontSize="lg"
          >
            Schweiz Mobil Link <External mx="2px" boxSize="4" />
          </Link>
        </NextLink>
        <Text fontSize="lg">{description}</Text>
        <Flex gap={["6", "8"]} my="8" wrap="wrap">
          <Fact label="Distanz" value={distance} />
          <Fact label="Aufstieg" value={ascent} />
          <Fact label="Abstieg" value={descent} />
          <Fact label="Dauer" value={duration} />
          <Fact label="Start" value={startPoint} />
          <Fact label="Ziel" value={endPoint} />
          <Fact label="Kaffepause" value={pause} />
        </Flex>
        <ButtonGroup mt="8">
          <Button onClick={modalOnOpen}>Bearbeiten</Button>
          <Button colorScheme="red" onClick={alertOnOpen}>
            Löschen
          </Button>
        </ButtonGroup>
        <Modal isOpen={modalIsOpen} onClose={modalOnClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Tour bearbeiten</ModalHeader>
            <ModalBody>
              <TourForm
                formName="editTour"
                initialValues={{
                  name,
                  description,
                  mapLink: mapUrl,
                  distance,
                  ascent,
                  descent,
                  duration,
                  start: startPoint,
                  end: endPoint,
                  pause,
                }}
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
                  const { error } = await supabaseClient
                    .from("touren")
                    .update({
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
                    })
                    .eq("id", id);

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
                  modalOnClose();
                }}
              />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button variant="outline" onClick={modalOnClose}>
                  Abbrechen
                </Button>
                <Button colorScheme="blue" type="submit" form="editTour">
                  Speichern
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={alertOnClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Tour löschen
              </AlertDialogHeader>
              <AlertDialogBody>
                Soll die Tour {name} gelöscht werden?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={alertOnClose}>
                  Abbrechen
                </Button>
                <Button colorScheme="red" onClick={deleteTour} ml={3}>
                  Löschen
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TourInfo;
