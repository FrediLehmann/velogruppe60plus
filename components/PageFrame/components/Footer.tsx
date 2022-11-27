import { Box, Button, Container, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box as="footer" mt="8" py="3" borderTop="1px solid" borderColor="gray.200">
      <Container
        display="flex"
        gap="8"
        alignItems="center"
        maxW="container.md"
        color="gray.500"
        fontSize={["xs", "sm"]}
        justifyContent="space-between"
      >
        <Text>© Copyright 2022 by Frederic Lehmann, all rights reserved.</Text>
        <NextLink href="/admin" passHref legacyBehavior>
          <Button as={Link} variant="link" size="xs">
            Admin
          </Button>
        </NextLink>
      </Container>
    </Box>
  );
};

export default Footer;
