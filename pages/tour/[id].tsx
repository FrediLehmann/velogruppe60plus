import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PageFrame, Tour as CurrentTour } from "components";
import { TourContext } from "lib/contexts/TourContext";
import { Tour as TourType } from "types/Tours.types";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import { useCallback, useEffect, useState } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  if (!ctx || !ctx.params || !ctx.params.id)
    return {
      redirect: {
        destination: "/alle-touren",
        permanent: false,
      },
    };

  const { data, error } = await supabase
    .from("touren")
    .select(
      "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image"
    )
    .eq("id", ctx.params.id)
    .single();

  if (error)
    return {
      redirect: {
        destination: "/alle-touren",
        permanent: false,
      },
    };

  return {
    props: { tour: data, id: ctx.params.id },
  };
};

export default function Tour({
  tour: serverTour,
  id,
}: {
  tour: TourType;
  id: number;
}) {
  const supabaseClient = useSupabaseClient();
  const [tour, setTour] = useState(serverTour);

  const load = useCallback(async () => {
    const { data } = await supabaseClient
      .from("touren")
      .select(
        "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image"
      )
      .eq("id", id)
      .single();

    setTour(data as TourType);
  }, [id, supabaseClient]);

  useEffect(() => {
    if (!serverTour) load();
  }, [load, serverTour]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | {tour.name}</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <PageFrame>
        <TourContext.Provider value={{ tour, load }}>
          <CurrentTour />
        </TourContext.Provider>
      </PageFrame>
    </>
  );
}
