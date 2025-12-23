import { Button, Center, Flex, Icon, Link, Text, chakra } from '@chakra-ui/react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import NextImage from 'next/image';
import { FiMail, FiPhone } from 'react-icons/fi';

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
	objectPosition: string | string[];
	image: string | StaticImport;
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
					css={{ filter: 'grayscale(60%)' }}
				/>
				<Text fontSize="lg" fontWeight="semibold" mt="2" mb="1">
					{name}
				</Text>
				<Text textAlign="center" fontSize="sm" fontWeight="thin" fontStyle="italic" maxW="20ch">
					{description}
				</Text>
			</Center>
			<Flex borderTop="1px solid" borderColor="gray.200" mt="6">
				<Button
					asChild
					w="50%"
					variant="ghost"
					border="none"
					borderRight="1px solid"
					borderRightRadius="none"
					borderColor="gray.200">
					<Link href="mailto:velogruppe60plus-sensetal@bluewin.ch" textDecoration="none">
						<Icon boxSize="5">
							<FiMail />
						</Icon>
						Email
					</Link>
				</Button>
				<Button asChild w="50%" variant="ghost">
					<Link href={`tel:${phone}`} textDecoration="none">
						<Icon boxSize="5">
							<FiPhone />
						</Icon>
						Telefon
					</Link>
				</Button>
			</Flex>
		</Flex>
	);
}
