import { useToast } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Admin as AdminContent, PageFrame } from "components";
import { TourListContext } from "lib/contexts/TourListContext";
import { Tour } from "lib/types/tours.types";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

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

const Admin = ({ tours: serverTours }: { tours: Tour[] }) => {
  const supabaseClient = useSupabaseClient();
  const toast = useToast();

  const [tours, setTours] = useState<Tour[]>(serverTours);

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
      load();
    },
    [load, supabaseClient, toast, tours]
  );

  useEffect(() => {
    if (!serverTours) load();
  }, [serverTours, load]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ | Admin</title>
      </Head>
      <PageFrame>
        <TourListContext.Provider value={{ tours, load, setNextTour }}>
          <AdminContent />
        </TourListContext.Provider>
      </PageFrame>
    </>
  );
};

export default Admin;
