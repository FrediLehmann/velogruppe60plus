import { Link } from '@chakra-ui/react';

export default function PasswordResetLink() {
	return (
		<Link href="/change-password" color="green.700">
			Passwort ändern
		</Link>
	);
}
