import { Button } from "@chakra-ui/react";
import { TourListContext } from "lib/contexts/TourListContext";
import { useContext } from "react";

const SetNextTour = ({ id, disabled }: { id: number; disabled: boolean }) => {
  const { setNextTour } = useContext(TourListContext);

  return (
    <Button
      disabled={disabled}
      variant="outline"
      colorScheme="mapGreen"
      onClick={() => setNextTour(id)}
    >
      Als nächste Tour festlegen
    </Button>
  );
};

export default SetNextTour;
