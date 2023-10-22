import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Link,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Info, List } from 'icons';
import { TrackClickEvent } from 'components';

const Header = () => {
  return (
    <Box as="header" borderBottom="1px solid" borderColor="gray.200">
      <Container
        py="4"
        maxW="container.md"
        display="flex"
        flexDirection={['column', null, 'row']}
        alignItems={['flex-start', null, 'center']}
        justifyContent="space-between">
        <NextLink href="/" passHref legacyBehavior>
          <Link
            as={Text}
            fontSize={['xl', '2xl']}
            fontWeight="bold"
            _hover={{ textDecoration: 'none' }}>
            Velogruppe 60+ Sensetal
          </Link>
        </NextLink>
        <ButtonGroup
          size="md"
          variant="ghost"
          colorScheme="gray"
          spacing="2"
          mt={['4', null, '0']}>
          <TrackClickEvent
            event={{ name: 'NAVIGATE_TO_ALL_TOURS_BUTTON_CLICK' }}
            showBox={true}>
            <NextLink href="/alle-touren" passHref legacyBehavior>
              <Button as="a" leftIcon={<List boxSize={['4', '5']} />}>
                Touren
              </Button>
            </NextLink>
          </TrackClickEvent>
          <TrackClickEvent
            event={{ name: 'NAVIGATE_TO_INFO_BUTTON_CLICK' }}
            showBox={true}>
            <NextLink href="/info" passHref legacyBehavior>
              <Button as="a" leftIcon={<Info boxSize={['4', '5']} />}>
                Informationen
              </Button>
            </NextLink>
          </TrackClickEvent>
        </ButtonGroup>
      </Container>
    </Box>
  );
};

export default Header;
