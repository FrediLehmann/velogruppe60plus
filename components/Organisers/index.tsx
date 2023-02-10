import { Flex, Heading } from '@chakra-ui/react';
import { OrganiserCard } from './components';

import arthur from './images/arthur.jpeg';
import paul from './images/paul.jpeg';
import peter from './images/peter.jpeg';

const Organisers = () => {
  return (
    <Flex flexDirection={['column', 'row', 'column']} as="section">
      <Heading as="h2" size="lg" mb="6" mr="4">
        Kontakte
      </Heading>
      <Flex
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
    </Flex>
  );
};

export default Organisers;
