import { Footer, Header, Login as LoginComponent } from "components";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ | Login</title>
      </Head>
      <Header />
      <LoginComponent />
      <Footer />
    </>
  );
};

export default Login;
