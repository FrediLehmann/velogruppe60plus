import { Container, useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";
import { NewTourSection, Tours } from "./components";
import { ToursContext } from "./context";
import { Tour } from "./tours.type";

const Admin = () => {
  const supabaseClient = useSupabaseClient();
  const [tours, setTours] = useState<Tour[]>([]);

  const toast = useToast();

  const loadTours = useCallback(async () => {
    const { data, error } = await supabaseClient
      .from("touren")
      .select(
        "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration"
      );

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

  useEffect(() => {
    loadTours();
  }, [loadTours]);

  return (
    <ToursContext.Provider value={{ tours, load: loadTours }}>
      <Container maxW="container.md" mt={["4", "6", "12"]}>
        <NewTourSection />
        <Tours />
      </Container>
    </ToursContext.Provider>
  );
};

export default Admin;
