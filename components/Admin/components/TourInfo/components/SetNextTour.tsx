import { Button } from '@chakra-ui/react';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useContext } from 'react';

const SetNextTour = ({ id, disabled }: { id: number; disabled: boolean }) => {
  const { setNextTour } = useContext(AdminTourListContext);

  return (
    <Button
      disabled={disabled}
      variant="outline"
      colorScheme="mapGreen"
      onClick={() => setNextTour(id)}>
      Als nächste Tour festlegen
    </Button>
  );
};

export default SetNextTour;
