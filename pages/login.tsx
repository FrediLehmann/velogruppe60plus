import { Login as LoginComponent, PageFrame } from "components";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ | Login</title>
      </Head>
      <PageFrame>
        <LoginComponent />
      </PageFrame>
    </>
  );
};

export default Login;
