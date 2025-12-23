import { Metadata } from 'next';

import { ResetPasswordComponent } from './components';

export const metadata: Metadata = {
	title: 'Velogruppe 60+ Sensetal | Passwort Reset',
	description: 'Passwort zurücksetzten.',
	robots: {
		index: false
	}
};

export default async function ChangePassword() {
	return <ResetPasswordComponent />;
}
