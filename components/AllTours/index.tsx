import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Text
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'icons';
import { AllTourListContext } from 'lib/contexts/AllTourListContext';
import { useContext } from 'react';
import { Tour } from './components';
import { Print as PrintIcon } from 'icons';
import { useRouter } from 'next/router';

const AllTours = () => {
  const { page, tours, totalTours, setPage, isLoading } =
    useContext(AllTourListContext);
  const totalPages = Math.ceil(totalTours / 10);
  const router = useRouter();

  return (
    <Container maxW="container.md" mt={['4', '6', '12']}>
      <Flex align="flex-end" justify="space-between" mb="8">
        <Box>
          <Heading as="h1" fontSize={['lg', 'xl']}>
            Alle Touren
          </Heading>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700">
            {totalTours} Touren
          </Text>
        </Box>
        <Button leftIcon={<PrintIcon />} onClick={() => router.push('/print')}>
          Drucken
        </Button>
      </Flex>
      <Flex gap={['4', '6']} direction="column">
        {isLoading
          ? [...new Array(10)].map((_, index) => (
              <Skeleton key={index} h="168" />
            ))
          : tours.map((tour, index) => <Tour key={index} {...tour} />)}
      </Flex>
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
    </Container>
  );
};

export default AllTours;
