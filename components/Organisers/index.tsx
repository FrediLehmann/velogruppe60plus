import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { OrganiserCard } from './components';

import arthur from './images/arthur.jpeg';
import paul from './images/paul.jpeg';
import peter from './images/peter.jpeg';
import hugo from './images/hugo.jpeg';

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
        Sie können sich jederzeit bei einem unserer Organisatoren melden,
        entweder per E-Mail oder telefonisch.
      </Text>
      <Grid
        mt="8"
        templateColumns={['1fr', 'repeat(2, 1fr)']}
        gap={['3', '4']}
        flexWrap="wrap">
        <GridItem>
          <OrganiserCard
            image={paul}
            name="Paul Lehmann"
            description="ESA-Radsportleiter mit Gesamtverantwortung"
            phone="+41 79 322 66 16"
            objectPosition="0 -34px"
          />
        </GridItem>
        <GridItem>
          <OrganiserCard
            image={arthur}
            name="Arthur Schneuwly"
            description="ESA-Radsportleiter, zuständig für die Planung und Leitung von Touren"
            phone="+41 78 801 67 45"
            objectPosition="0 -38px"
          />
        </GridItem>
        <GridItem>
          <OrganiserCard
            image={peter}
            name="Peter Poffet"
            description="Zuständig für die Kommunikation und Leitung von Touren"
            phone="+41 79 648 52 47"
            objectPosition="1px -9px"
          />
        </GridItem>
        <GridItem>
          <OrganiserCard
            image={hugo}
            name="Hugo Spicher"
            description="Zuständig für die Sicherheit und Leitung von Touren"
            phone="+41 79 311 79 36"
            objectPosition="0 -30px"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Organisers;
