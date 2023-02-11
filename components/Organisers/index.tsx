import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { OrganiserCard } from './components';

import arthur from './images/arthur.jpeg';
import paul from './images/paul.jpeg';
import peter from './images/peter.jpeg';

const Organisers = () => {
  return (
    <Box as="section">
      <Heading as="h2" size="md" color="green.800">
        Kontakte
      </Heading>
      <Heading as="h2" size="lg" mb="3">
        Bei wem kann ich mich melden?
      </Heading>
      <Text fontSize="lg">
        Sie können sich jederzeit bei einem unserer Organisatoren melden.
        Jeweils per E-Mail oder Telefonisch.
      </Text>
      <Flex
        mt="8"
        direction={['column', 'row']}
        gap="3"
        justifyContent="space-between"
        flexWrap="wrap">
        <OrganiserCard
          image={paul}
          name="Paul Lehmann"
          description='"Organisator und verwalter der Webseite"'
          phone="+41 79 322 66 16"
          objectPosition="0 -34px"
        />
        <OrganiserCard
          image={arthur}
          name="Arthur Schneuwly"
          description='"Organisator und verwalter der Webseite"'
          phone="+41 78 801 67 45"
          objectPosition="0 -42px"
        />
        <OrganiserCard
          image={peter}
          name="Peter Poffet"
          description='"Organisator und verwalter der Webseite"'
          phone="+41 79 648 52 47"
          objectPosition="0 -10px"
        />
      </Flex>
    </Box>
  );
};

export default Organisers;
