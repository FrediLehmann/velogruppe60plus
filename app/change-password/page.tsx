import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { ResetPasswordComponent } from './components';

export const metadata = {
	title: 'Velogruppe 60+ Sensetal | Passwort Reset',
	description: 'Passwort zurücksetzten.',
	robots: {
		index: false
	}
};

export default async function ChangePassword() {
	const supabase = await createClient();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) redirect('/');

	return <ResetPasswordComponent />;
}
