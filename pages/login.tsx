import { useUser } from '@supabase/auth-helpers-react';
import { Login as LoginComponent, PageFrame } from 'components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) router.push('/admin');
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Login</title>
        <meta name="robots" content="noindex"></meta>
        <meta name="description" content="Login für den Admin bereich." />
      </Head>
      <PageFrame>
        <LoginComponent />
      </PageFrame>
    </>
  );
};

export default Login;
