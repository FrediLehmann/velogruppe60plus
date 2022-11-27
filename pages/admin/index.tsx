import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Admin as AdminContent, PageFrame } from "components";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";

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

  return {
    props: {},
  };
};

const Admin = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ | Admin</title>
      </Head>
      <PageFrame>
        <AdminContent />
      </PageFrame>
    </>
  );
};

export default Admin;
