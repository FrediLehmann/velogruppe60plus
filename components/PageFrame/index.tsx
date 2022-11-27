import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Footer, Header } from "./components";

const PageFrame = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" justify="space-between" minH="100vh">
      <Header />
      {children}
      <Footer />
    </Flex>
  );
};

export default PageFrame;
