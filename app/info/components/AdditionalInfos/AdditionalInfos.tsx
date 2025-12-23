'use client';

import { Box, Flex, Heading, Icon, Link } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

export default function AdditionalInfos() {
	return (
		<Box>
			<Heading as="h2" size="xl" color="green.800">
				Links
			</Heading>
			<Heading as="h2" size="3xl" mb="3">
				Wo finde ich weitere Informationen?
			</Heading>
			<Flex flexDirection={['column', 'row']} gap={['2', '6']}>
				<Link href="/ablauf">
					Ablauf
					<Icon boxSize="5">
						<FiArrowRight />
					</Icon>
				</Link>
				<Link href="/unfallverhalten">
					Unfallverhalten
					<Icon boxSize="5">
						<FiArrowRight />
					</Icon>
				</Link>
				<Link href="/e-bikes">
					Gesetzliche Regelung E-Bikes
					<Icon boxSize="5">
						<FiArrowRight />
					</Icon>
				</Link>
			</Flex>
		</Box>
	);
}
