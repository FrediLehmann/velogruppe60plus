import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { ArrowRight } from 'icons';
import NextLink from 'next/link';

const AdditionalInfos = () => {
  return (
    <Box>
      <Heading as="h2" size="md" color="green.800">
        Links
      </Heading>
      <Heading as="h2" size="lg" mb="3">
        Wo finde ich weitere Informationen?
      </Heading>
      <Flex gap="6">
        <NextLink href="/unfallverhalten" passHref legacyBehavior>
          <Link display="block" color="green.700">
            Unfallverhalten <ArrowRight boxSize="4" />
          </Link>
        </NextLink>
        <NextLink href="/e-bikes" passHref legacyBehavior>
          <Link display="block" color="green.700">
            Gesetzliche Regelung E-Bikes <ArrowRight boxSize="4" />
          </Link>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default AdditionalInfos;
