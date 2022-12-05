import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AdminTourListContext } from "lib/contexts/AdminTourListContext";
import { useContext, useRef } from "react";

const DeleteTour = ({
  id,
  name,
  image,
  disabled,
}: {
  id: number;
  name: string;
  image: string;
  disabled: boolean;
}) => {
  const cancelRef = useRef(null);
  const { load } = useContext(AdminTourListContext);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const supabaseClient = useSupabaseClient();

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
    onClose();
  };

  return (
    <>
      <Button disabled={disabled} colorScheme="red" onClick={onOpen}>
        Löschen
      </Button>
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
              Soll die Tour &quot;{name}&quot; gelöscht werden?
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
    </>
  );
};

export default DeleteTour;
