import { Container } from "@chakra-ui/react";
import { NewTourSection } from "./components";

const Admin = () => {
  return (
    <Container maxW="container.md" mt={["4", "6", "12"]}>
      <NewTourSection />
    </Container>
  );
};

export default Admin;
