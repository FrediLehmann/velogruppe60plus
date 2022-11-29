import { Button } from "@chakra-ui/react";
import { ToursContext } from "components/Admin/context";
import { useContext } from "react";

const SetNextTour = ({ id, disabled }: { id: number; disabled: boolean }) => {
  const { setNextTour } = useContext(ToursContext);

  return (
    <Button
      disabled={disabled}
      variant="outline"
      colorScheme="blue"
      onClick={() => setNextTour(id)}
    >
      Als nächste Tour festlegen
    </Button>
  );
};

export default SetNextTour;
