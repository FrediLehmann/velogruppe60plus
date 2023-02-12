import {
  Accordion,
  Button,
  ButtonGroup,
  Center,
  IconButton,
  Skeleton
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'icons';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useContext } from 'react';
import { TourInfo } from '.';

const Tours = () => {
  const { page, tours, totalTours, setPage } = useContext(AdminTourListContext);
  const totalPages = Math.ceil(totalTours / 10);

  if (tours.length === 0) return <Skeleton h="xl" />;
  return (
    <Accordion allowMultiple mt="8">
      {tours?.map((tour, index) => (
        <TourInfo key={index} {...tour} />
      ))}
      <Center mt="8">
        <ButtonGroup size="lg" variant="outline" isAttached>
          {page !== 1 && (
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeft boxSize="6" />}
              onClick={() => setPage(page - 1)}
            />
          )}
          {[...new Array(totalPages)].map((_, index) => {
            return (
              <Button
                key={index}
                bg={page === index + 1 ? 'gray.100' : 'transparent'}
                onClick={() => page !== index + 1 && setPage(index + 1)}>
                {index + 1}
              </Button>
            );
          })}
          {page < totalPages && (
            <IconButton
              aria-label="Next page"
              icon={<ChevronRight boxSize="6" />}
              onClick={() => setPage(page + 1)}
            />
          )}
        </ButtonGroup>
      </Center>
    </Accordion>
  );
};

export default Tours;
