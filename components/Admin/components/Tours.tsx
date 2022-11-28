import { Accordion } from "@chakra-ui/react";
import { useContext } from "react";
import { TourInfo } from ".";
import { ToursContext } from "../context";

const Tours = () => {
  const { tours } = useContext(ToursContext);

  return (
    <Accordion allowMultiple mt="8">
      {tours.map((tour, index) => (
        <TourInfo key={index} {...tour} />
      ))}
    </Accordion>
  );
};

export default Tours;
