import { Box, Button, Container, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box as="footer" mt="8" py="3" borderTop="1px solid" borderColor="gray.200">
      <Container
        maxW="container.md"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="8"
      >
        <Box color="gray.500" fontSize={["xs", "sm"]}>
          <Text>© Copyright 2022 by Frederic Lehmann,</Text>
          <Text>all rights reserved.</Text>
        </Box>
        <Flex gap="3">
          <NextLink
            href="https://github.com/FrediLehmann/velogruppe60plus"
            passHref
            legacyBehavior
          >
            <Button
              as={Link}
              aria-label="Github"
              isExternal
              variant="link"
              size="xs"
            >
              Github
            </Button>
          </NextLink>
          <NextLink href="/admin" passHref legacyBehavior>
            <Button as={Link} variant="link" size="xs">
              Admin
            </Button>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
