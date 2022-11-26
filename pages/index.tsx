import { Footer, Header, Tour } from "components";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Velogruppe 60+</title>
      </Head>
      <Header />
      <Tour />
      <Footer />
    </>
  );
}
