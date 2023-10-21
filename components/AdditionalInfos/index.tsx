import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { TrackClickEvent } from 'components';
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
      <Flex flexDirection={['column', 'row']} gap={['2', '6']}>
        <TrackClickEvent event={{ name: 'ACCIDENT_PAGE_LINK_CLICK' }}>
          <NextLink href="/unfallverhalten" passHref legacyBehavior>
            <Button as="a" rightIcon={<ArrowRight boxSize="5" />}>
              Unfallverhalten
            </Button>
          </NextLink>
        </TrackClickEvent>
        <TrackClickEvent event={{ name: 'EBIKE_PAGE_LINK_CLICK' }}>
          <NextLink href="/e-bikes" passHref legacyBehavior>
            <Button as="a" rightIcon={<ArrowRight boxSize="5" />}>
              Gesetzliche Regelung E-Bikes
            </Button>
          </NextLink>
        </TrackClickEvent>
      </Flex>
    </Box>
  );
};

export default AdditionalInfos;
