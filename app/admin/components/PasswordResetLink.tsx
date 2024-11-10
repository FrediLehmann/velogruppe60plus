import { Box, Link } from '@chakra-ui/react';

export default function PasswordResetLink() {
	return (
		<Box as="section" mb="12">
			<Link href="/change-password" color="green.700">
				Passwort ändern
			</Link>
		</Box>
	);
}
