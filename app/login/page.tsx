import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { LoginComponent } from './components';

export const metadata = {
	title: 'Velogruppe 60+ Sensetal | Login',
	description: 'Login für den Admin bereich.',
	robots: {
		index: false
	}
};

export default async function Login() {
	const supabase = await createClient();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (user) redirect('/admin');

	return <LoginComponent />;
}
