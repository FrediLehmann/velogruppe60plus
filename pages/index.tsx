import { PageFrame, Tour } from "components";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Velogruppe 60+</title>
      </Head>
      <PageFrame>
        <Tour />
      </PageFrame>
    </>
  );
}
