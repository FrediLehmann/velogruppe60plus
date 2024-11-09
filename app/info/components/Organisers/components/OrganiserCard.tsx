import { Button, Center, Flex, Text, chakra } from '@chakra-ui/react';
import NextImage from 'next/image';

import { TrackClickEvent } from '@/components';
import { Mail, Phone } from '@/icons';

const Image = chakra(NextImage);

export default function OrganiserCard({
	name,
	phone,
	description,
	objectPosition,
	image
}: {
	name: string;
	description: string;
	phone: string;
	objectPosition: string | string[] | any[];
	image: any;
}) {
	return (
		<Flex
			flexDirection="column"
			justifyContent="space-between"
			background="white"
			border="1px solid"
			borderColor="gray.200"
			borderRadius="lg"
			minH="290px">
			<Center flexDirection="column" mt="5">
				<Image
					borderRadius="full"
					alt={name}
					objectFit="cover"
					objectPosition={objectPosition}
					src={image}
					width="100px"
					height="100px"
					sx={{ filter: 'grayscale(60%)' }}
				/>
				<Text fontSize="lg" fontWeight="semibold" mt="2" mb="1">
					{name}
				</Text>
				<Text textAlign="center" fontSize="sm" fontWeight="thin" fontStyle="italic" maxW="20ch">
					{description}
				</Text>
			</Center>
			<Flex borderTop="1px solid" borderColor="gray.200" mt="6">
				<TrackClickEvent event={{ name: 'SEND_EMAIL_BUTTON_CLICK' }}>
					<Button
						as="a"
						href="mailto:velogruppe60plus-sensetal@bluewin.ch"
						w="50%"
						variant="ghost"
						borderRight="1px solid"
						borderColor="gray.200"
						leftIcon={<Mail boxSize="5" />}>
						Email
					</Button>
				</TrackClickEvent>
				<TrackClickEvent event={{ name: `CALL_${name.toUpperCase()}_BUTTON_CLICK` }}>
					<Button
						as="a"
						href={`tel:${phone}`}
						w="50%"
						variant="ghost"
						leftIcon={<Phone boxSize="5" />}>
						Telefon
					</Button>
				</TrackClickEvent>
			</Flex>
		</Flex>
	);
}
