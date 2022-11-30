import { Accordion } from "@chakra-ui/react";
import { TourListContext } from "lib/contexts/TourListContext";
import { useContext } from "react";
import { TourInfo } from ".";

const Tours = () => {
  const { tours } = useContext(TourListContext);

  return (
    <Accordion allowMultiple mt="8">
      {tours.map((tour, index) => (
        <TourInfo key={index} {...tour} />
      ))}
    </Accordion>
  );
};

export default Tours;
