import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { ResetPasswordComponents } from './components';

export const metadata = {
	title: 'Velogruppe 60+ Sensetal | Passwort Reset',
	description: 'Passwort zurücksetzten.',
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

	return <ResetPasswordComponents />;
}
