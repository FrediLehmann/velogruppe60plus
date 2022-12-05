import { Center, Container, Flex, Heading } from "@chakra-ui/react";
import { AllTourListContext } from "lib/contexts/AllTourListContext";
import { useContext } from "react";
import { Tour } from "./components";

const AllTours = () => {
  const { tours } = useContext(AllTourListContext);

  return (
    <Container maxW="container.md" mt={["4", "6", "12"]}>
      <Heading as="h1" fontSize={["lg", "xl"]} mb="8">
        Alle Touren
      </Heading>
      <Flex gap={["4", "6"]} direction="column">
        {tours.map((tour, index) => (
          <Tour key={index} {...tour} />
        ))}
      </Flex>
      <Center mt="8"></Center>
    </Container>
  );
};

export default AllTours;
