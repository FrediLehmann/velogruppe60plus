import { Accordion, Skeleton } from '@chakra-ui/react';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useContext } from 'react';
import { TourInfo } from '.';

const Tours = () => {
  const { tours } = useContext(AdminTourListContext);

  if (tours.length === 0) return <Skeleton h="xl" />;
  return (
    <Accordion allowMultiple mt="8">
      {tours?.map((tour, index) => (
        <TourInfo key={index} {...tour} />
      ))}
    </Accordion>
  );
};

export default Tours;
