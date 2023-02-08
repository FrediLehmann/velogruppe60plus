import { Button, chakra, Flex, Text } from '@chakra-ui/react';
import { Phone } from 'icons';
import NextImage from 'next/image';

const Image = chakra(NextImage);

const Organisers = ({
  image,
  name,
  phoneNumber,
  objectPosition
}: {
  image: any;
  name: string;
  phoneNumber: string;
  objectPosition: string | string[] | any[];
}) => {
  return (
    <Flex direction="column" alignItems="center" px="4">
      <Image
        borderRadius="full"
        alt={name}
        objectFit="cover"
        objectPosition={objectPosition}
        src={image}
        width={['80px', '60px', '80px']}
        height={['80px', '60px', '80px']}
        sx={{ filter: 'grayscale(60%)' }}
      />
      <Text
        mt={['3', '1', '3']}
        fontSize={['xl', 'md', 'xl']}
        fontWeight="bold">
        {name}
      </Text>
      <Button
        as="a"
        href={`tel:${phoneNumber}`}
        color="green.600"
        mt={['1', '0.5', '1']}
        fontSize={['md', 'sm', 'md']}
        variant="link">
        {phoneNumber}
      </Button>
    </Flex>
  );
};

export default Organisers;
