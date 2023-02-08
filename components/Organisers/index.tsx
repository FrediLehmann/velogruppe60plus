import { Box, Divider, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { m } from 'framer-motion';
import { Organiser } from './components';

import arthur from './images/arthur.jpeg';
import paul from './images/paul.jpeg';
import peter from './images/peter.jpeg';

const Organisers = () => {
  return (
    <Box as="section">
      <Heading as="h2" size="md" mb="2">
        Kontakt
      </Heading>
      <Text>
        {' '}
        <Link
          href="mailto:velogruppe60plus-sensetal@bluewin.ch"
          color="green.500">
          velogruppe60plus-sensetal@bluewin.ch
        </Link>{' '}
      </Text>
      <Flex
        direction={['column', 'row']}
        justifyContent="space-between"
        alignItems="center"
        mt="6"
        gap={['4', '0']}>
        <Organiser
          image={paul}
          name="Paul Lehmann"
          phoneNumber="+41 79 322 66 16"
          objectPosition={['0 -25px', '0 -20px', '0 -25px']}
        />
        <Divider
          orientation="vertical"
          borderColor="gray.300"
          height={['0', '130', '170']}
        />
        <Organiser
          image={peter}
          name="Peter Poffet"
          phoneNumber="+41 79 648 52 47"
          objectPosition={['0 -14px', '0 -10px', '0 -14px']}
        />
        <Divider
          orientation="vertical"
          borderColor="gray.300"
          height={['0', '130', '170']}
        />
        <Organiser
          image={arthur}
          name="Arthur Schneuwly"
          phoneNumber="+41 78 801 67 45"
          objectPosition={['0 -35px', '0 -24px', '0 -35px']}
        />
      </Flex>
    </Box>
  );
};

export default Organisers;
