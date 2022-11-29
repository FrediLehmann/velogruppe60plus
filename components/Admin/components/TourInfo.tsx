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
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Image,
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
import { useContext, useRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ToursContext } from "../context";
import { TourForm } from ".";
import { Tour } from "lib/types/tours.type";

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
  next_tour,
  image,
}: Tour) => {
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
  const { load, setNextTour } = useContext(ToursContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteTour = async () => {
    await supabaseClient.storage.from("map-images").remove([image]);
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
          <Flex
            align="center"
            flex="1"
            textAlign="left"
            fontSize="lg"
            fontWeight="semibold"
            gap="6"
          >
            {name}
            {next_tour && (
              <Badge variant="outline" colorScheme="blue">
                Nächste Tour
              </Badge>
            )}
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Flex my={["6", "10"]} gap="8" flexDirection={["column", "row"]}>
          <Text fontSize={["lg", "xl"]}>{description}</Text>
          <Flex gap={["6", "8"]} wrap="wrap">
            <Fact label="Distanz" value={distance} />
            <Fact label="Aufstieg" value={ascent} />
            <Fact label="Abstieg" value={descent} />
            <Fact label="Dauer" value={duration} />
            <Fact label="Start" value={startPoint} />
            <Fact label="Ziel" value={endPoint} />
            <Fact label="Kaffepause" value={pause} />
          </Flex>
        </Flex>
        <NextLink href={mapUrl} passHref legacyBehavior>
          <Link display="block" my="2" isExternal color="blue.700">
            Auf Schweiz Mobil anschauen <External mx="2px" boxSize="4" />
          </Link>
        </NextLink>
        <Image
          alt="Bild der Karte"
          src={
            supabaseClient.storage.from("map-images").getPublicUrl(image).data
              .publicUrl
          }
        />
        <Flex mt="6" gap="3" flexWrap="wrap">
          <Button onClick={modalOnOpen}>Bearbeiten</Button>
          <Button disabled={next_tour} colorScheme="red" onClick={alertOnOpen}>
            Löschen
          </Button>
          {!next_tour && (
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => setNextTour(id)}
            >
              Als nächste Tour festlegen
            </Button>
          )}
        </Flex>
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
                  mapImage: image,
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

                  let img = mapImage;
                  if (typeof mapImage !== "string") {
                    const { data, error: imageUploadError } =
                      await supabaseClient.storage
                        .from("map-images")
                        .upload(
                          `${id.toString()}.${mapImage.name.split(".").pop()}`,
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

                    img = data.path;
                  }

                  const { error } = await supabaseClient
                    .from("touren")
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
                    setIsSubmitting(false);
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
                  setIsSubmitting(false);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button
                  disabled={isSubmitting}
                  variant="outline"
                  onClick={modalOnClose}
                >
                  Abbrechen
                </Button>
                <Button
                  colorScheme="blue"
                  type="submit"
                  form="editTour"
                  isLoading={isSubmitting}
                >
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
