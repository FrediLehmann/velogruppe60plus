import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Tour } from "./components";
import { ToursContext } from "./context";

const AllTours = () => {
  const { tours } = useContext(ToursContext);

  return (
    <Container maxW="container.md" mt={["4", "6", "12"]}>
      <Heading as="h1" fontSize={["lg", "xl"]} mb="8">
        Alle Touren
      </Heading>
      <Flex
        gap={["4", "6"]}
        wrap={["nowrap", "wrap"]}
        direction={["column", "row"]}
      >
        {tours.map((tour, index) => (
          <Tour key={index} {...tour} />
        ))}
      </Flex>
    </Container>
  );
};

export default AllTours;
