import { Container } from "@chakra-ui/react";
import { NewTourSection, Tours } from "./components";

const Admin = () => {
  return (
    <Container maxW="container.md" mt={["4", "6", "12"]}>
      <NewTourSection />
      <Tours />
    </Container>
  );
};

export default Admin;
