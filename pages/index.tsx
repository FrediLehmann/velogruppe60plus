import { PageFrame, Tour } from "components";
import { GetServerSidePropsContext } from "next/types";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Tour as TourType } from "lib/types/tours.types";
import { TourContext } from "components/Tour/context";
import { useCallback, useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase
    .from("touren")
    .select(
      "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image"
    )
    .eq("next_tour", true)
    .single();

  return {
    props: { tour: data },
  };
};

export default function Home({ tour: serverTour }: { tour: TourType }) {
  const [tour, setTour] = useState(serverTour);
  const supabaseClient = useSupabaseClient();

  const load = useCallback(async () => {
    const { data } = await supabaseClient
      .from("touren")
      .select(
        "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour, image"
      )
      .eq("next_tour", true)
      .single();

    setTour(data as TourType);
  }, [supabaseClient]);

  useEffect(() => {
    if (!serverTour) load();
  }, [load, serverTour]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+</title>
      </Head>
      <PageFrame>
        <TourContext.Provider value={{ tour, load }}>
          <Tour />
        </TourContext.Provider>
      </PageFrame>
    </>
  );
}
