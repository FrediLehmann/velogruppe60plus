import { Container, useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";
import { NewTourSection, Tours } from "./components";
import { ToursContext } from "./context";
import { Tour } from "lib/types/tours.type";

const Admin = () => {
  const supabaseClient = useSupabaseClient();
  const [tours, setTours] = useState<Tour[]>([]);

  const toast = useToast();

  const loadTours = useCallback(async () => {
    const { data, error } = await supabaseClient
      .from("touren")
      .select(
        "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image"
      )
      .order("id");

    if (error) {
      toast({
        title: "Fehler beim laden der Touren.",
        description:
          "Tour konnte nicht geladen werden. Versuchen Sie es später erneut.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (data) setTours(data);
  }, [supabaseClient, toast]);

  const setNextTour = useCallback(
    async (id: number) => {
      const activeNextTourId = tours.find((tour) => tour.next_tour)?.id;

      const { error } = await supabaseClient
        .from("touren")
        .update({ next_tour: true })
        .eq("id", id);
      if (error) {
        toast({
          title: "Fehler beim speichern der nächsten Tour.",
          description:
            "Es ist ein Fehler aufgetreten beim speichern der nächsten Tour.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      if (activeNextTourId) {
        const { error: nextTourError } = await supabaseClient
          .from("touren")
          .update({ next_tour: false })
          .eq("id", activeNextTourId);

        if (nextTourError) {
          toast({
            title: "Fehler beim speichern.",
            description: "Aktuelle Tour konnte nicht entfernt werden.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          return;
        }
      }

      toast({
        title: "Nächste Tour festgelegt.",
        description: "Die nächste Tour wurde erfolgreich festgelegt.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      loadTours();
    },
    [loadTours, supabaseClient, toast, tours]
  );

  useEffect(() => {
    loadTours();
  }, [loadTours]);

  return (
    <ToursContext.Provider value={{ tours, load: loadTours, setNextTour }}>
      <Container maxW="container.md" mt={["4", "6", "12"]}>
        <NewTourSection />
        <Tours />
      </Container>
    </ToursContext.Provider>
  );
};

export default Admin;
