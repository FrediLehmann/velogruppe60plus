import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Login as LoginComponent, PageFrame } from "components";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

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
