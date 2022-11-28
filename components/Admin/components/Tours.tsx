import { Accordion, useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { TourInfo } from ".";

const Tours = () => {
  const supabaseClient = useSupabaseClient();
  const [tours, setTours] = useState<
    {
      id: number;
      name: string;
      description: string;
      mapUrl: string;
      startPoint: string;
      endPoint: string;
      pause: string;
      distance: string;
      ascent: string;
      descent: string;
      duration: string;
    }[]
  >([]);

  const toast = useToast();

  useEffect(() => {
    const loadTours = async () => {
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
        });
        return;
      }

      if (data) setTours(data);
    };

    loadTours();
  }, [supabaseClient, toast]);

  return (
    <Accordion allowMultiple mt="8">
      {tours.map((tour, index) => (
        <TourInfo key={index} {...tour} />
      ))}
    </Accordion>
  );
};

export default Tours;
