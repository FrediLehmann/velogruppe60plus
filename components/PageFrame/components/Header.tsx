'use client';

import { Box, Button, ButtonGroup, Container, Icon, Link, Text } from '@chakra-ui/react';
import { FiInfo, FiList } from 'react-icons/fi';

export default function Header() {
	return (
		<Box
			as="header"
			borderBottom="1px solid"
			borderColor="gray.200"
			css={{ '@media print': { display: 'none' } }}>
			<Container
				p="4"
				maxW="768px"
				display="flex"
				flexDirection={['column', null, 'row']}
				alignItems={['flex-start', null, 'center']}
				justifyContent="space-between">
				<Link
					href="/"
					fontSize={['xl', '2xl']}
					fontWeight="bold"
					_hover={{ textDecoration: 'none' }}>
					Velogruppe 60+ Sensetal
				</Link>
				<ButtonGroup size="md" variant="ghost" colorScheme="gray" gap="2" mt={['4', null, '0']}>
					<Button asChild _hover={{ background: 'bgGray.200' }}>
						<Link href="/alle-touren" fontWeight="semibold" fontSize="md" textDecoration="none">
							<Icon boxSize={['4', '5']}>
								<FiList />
							</Icon>
							Touren
						</Link>
					</Button>
					<Button asChild _hover={{ background: 'bgGray.200' }}>
						<Link href="/info" fontWeight="semibold" fontSize="md" textDecoration="none">
							<Icon boxSize={['4', '5']}>
								<FiInfo />
							</Icon>
							Informationen
						</Link>
					</Button>
				</ButtonGroup>
			</Container>
		</Box>
	);
}
