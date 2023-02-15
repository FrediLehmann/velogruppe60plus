import { Box, Flex, Text } from '@chakra-ui/react';
import { AlertTriangle } from 'icons';

const TourCanceled = ({ tourDate = '' }: { tourDate?: string }) => {
  return (
    <Flex
      p="4"
      gap="6"
      background="red.50"
      border="1px solid"
      borderColor="red.100"
      borderRadius="sm"
      alignItems="center">
      <AlertTriangle boxSize="10" />
      <Box>
        <Text fontSize="sm" fontWeight="semibold" color="gray.700">
          Tour abgesagt
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {tourDate.split('um')[0]}
        </Text>
      </Box>
    </Flex>
  );
};

export default TourCanceled;
