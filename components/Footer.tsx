import { Box, Container, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" mt="8" py="3" borderTop="1px solid" borderColor="gray.200">
      <Container
        display="flex"
        maxW="container.md"
        color="gray.500"
        fontSize={["xs", "sm"]}
      >
        <Text>© Copyright 2022 by Frederic Lehmann, all rights reserved.</Text>
      </Container>
    </Box>
  );
};

export default Footer;
