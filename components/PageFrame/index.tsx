import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Footer, Header } from "./components";

const PageFrame = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" justify="space-between" minH="100vh">
      <Box>
        <Header />
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default PageFrame;
