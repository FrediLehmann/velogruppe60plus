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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { External } from "icons";
import { Fact } from "components";
import { useRef } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

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

    onClose();
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
          <Button>Bearbeiten</Button>
          <Button colorScheme="red" onClick={onOpen}>
            Löschen
          </Button>
        </ButtonGroup>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
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
                <Button ref={cancelRef} onClick={onClose}>
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
