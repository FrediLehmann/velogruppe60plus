import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { TourListContext } from "lib/contexts/TourListContext";
import { useContext } from "react";
import { Tour } from "./components";

const AllTours = () => {
  const { tours } = useContext(TourListContext);

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
    </Container>
  );
};

export default AllTours;
