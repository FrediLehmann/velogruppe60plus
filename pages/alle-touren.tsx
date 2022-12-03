import { useToast } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AllTours, PageFrame } from "components";
import { TourListContext } from "lib/contexts/TourListContext";
import { Tour } from "types/Tours.types";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import { useCallback, useEffect, useState } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase
    .from("touren")
    .select(
      "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image"
    )
    .order("name");

  return {
    props: {
      tours: data,
    },
  };
};

const AlleTouren = ({ tours: serverTours }: { tours: Tour[] }) => {
  const toast = useToast();
  const supabaseClient = useSupabaseClient();
  const [tours, setTours] = useState(serverTours);

  const load = useCallback(async () => {
    const { data, error } = await supabaseClient
      .from("touren")
      .select(
        "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image"
      )
      .order("name");

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
    if (!serverTours) load();
  }, [serverTours, load]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ | Alle Touren</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <PageFrame>
        <TourListContext.Provider
          value={{ tours, load, setNextTour: (_) => _ }}
        >
          <AllTours />
        </TourListContext.Provider>
      </PageFrame>
    </>
  );
};

export default AlleTouren;
