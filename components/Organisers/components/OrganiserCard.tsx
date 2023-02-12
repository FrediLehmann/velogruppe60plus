import { Box, Button, Center, chakra, Flex, Text } from '@chakra-ui/react';
import { Mail, Phone } from 'icons';
import NextImage from 'next/image';

const Image = chakra(NextImage);

const OrganiserCard = ({
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
}) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      background="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg">
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
        <Text
          textAlign="center"
          fontSize="sm"
          fontWeight="thin"
          fontStyle="italic"
          maxW="20ch">
          {description}
        </Text>
      </Center>
      <Flex borderTop="1px solid" borderColor="gray.200" mt="6">
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
        <Button
          as="a"
          href={`tel:${phone}`}
          w="50%"
          variant="ghost"
          leftIcon={<Phone boxSize="5" />}>
          Telefon
        </Button>
      </Flex>
    </Flex>
  );
};

export default OrganiserCard;
