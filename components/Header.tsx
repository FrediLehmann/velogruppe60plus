import { Button, ButtonGroup, Container, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Header = () => {
  return (
    <Container
      as="header"
      py="4"
      maxW="container.md"
      display="flex"
      justifyContent="space-between"
    >
      <Text fontSize={["xl", "2xl"]} fontWeight="bold">
        Velogruppe60+
      </Text>
      <ButtonGroup>
        <NextLink href="/alle-touren" passHref legacyBehavior>
          <Button as={Link} variant="link">
            Alle Touren
          </Button>
        </NextLink>
      </ButtonGroup>
    </Container>
  );
};

export default Header;
