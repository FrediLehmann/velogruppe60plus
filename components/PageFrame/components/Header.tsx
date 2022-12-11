import {
  Button,
  ButtonGroup,
  Container,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Menu as MenuIcon } from 'icons';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan30em] = useMediaQuery('(min-width: 30em)');

  return (
    <Container
      as="header"
      py="4"
      maxW="container.md"
      display="flex"
      alignItems="center"
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
      {isLargerThan30em ? (
        <ButtonGroup variant="link" size="md" spacing="3" colorScheme="black">
          <NextLink href="/alle-touren" passHref legacyBehavior>
            <Button as={Link}>Alle Touren</Button>
          </NextLink>
          <NextLink href="/bedingungen" passHref legacyBehavior>
            <Button as={Link}>Bedingugen</Button>
          </NextLink>
          <NextLink href="/allgemeines" passHref legacyBehavior>
            <Button as={Link}>Allgemein</Button>
          </NextLink>
        </ButtonGroup>
      ) : (
        <Menu isOpen={isOpen} onClose={onClose} placement="bottom-end">
          <MenuButton
            as={Button}
            size="sm"
            leftIcon={<MenuIcon />}
            variant="outline"
            onClick={onOpen}>
            Menu
          </MenuButton>
          <MenuList>
            <MenuItem as={NextLink} href="/alle-touren">
              Alle Touren
            </MenuItem>
            <MenuItem as={NextLink} href="/bedingungen">
              Bedingugen
            </MenuItem>
            <MenuItem as={NextLink} href="/allgemeines">
              Allgemein
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Container>
  );
};

export default Header;
