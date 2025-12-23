'use client';

import { Box, Button, ButtonGroup, Container, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

export default function Footer() {
	const router = useRouter();
	const supabase = createClient();

	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		async function checkSession() {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			setSignedIn(user !== null);
		}

		checkSession();
	}, [supabase.auth]);

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event === 'SIGNED_IN') {
				setSignedIn(true);
			} else if (event === 'SIGNED_OUT') {
				setSignedIn(false);
			}
		});

		return () => data.subscription.unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box
			as="footer"
			mt="8"
			py="3"
			borderTop="1px solid"
			borderColor="gray.200"
			css={{ '@media print': { display: 'none' } }}>
			<Container
				maxW="768px"
				px="4"
				display="flex"
				alignItems={['flex-start', 'center']}
				flexDirection={['column-reverse', 'row']}
				justifyContent="space-between"
				gap={['3', '8']}>
				<Box color="gray.700" fontSize={['xs', 'sm']}>
					<Text>© Copyright {new Date().getFullYear()} by Frederic Lehmann,</Text>
					<Text>all rights reserved.</Text>
				</Box>
				<ButtonGroup gap="3" size="xs" colorScheme="black">
					<Link
						href="https://github.com/FrediLehmann/velogruppe60plus"
						target="_blank"
						fontSize="xs"
						fontWeight="bold">
						Github
					</Link>
					{signedIn && (
						<Button
							variant="ghost"
							fontSize="xs"
							fontWeight="bold"
							onClick={async () => {
								await supabase.auth.signOut();
								router.push('/');
							}}>
							Abmelden
						</Button>
					)}
					{signedIn ? (
						<Link href="/admin" fontSize="xs" fontWeight="bold">
							Admin
						</Link>
					) : (
						<Link href="/login" fontSize="xs" fontWeight="bold">
							Login
						</Link>
					)}
				</ButtonGroup>
			</Container>
		</Box>
	);
}
