import { Box, Button, Divider } from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Plus } from 'icons';
import { useEffect, useState } from 'react';
import { NextTour } from './components';
import { TourDate } from './TourDate';

const NextTourSection = () => {
  const [nextTour, setNextTour] = useState<TourDate | null>();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const loadDate = async () => {
      const { data, error } = await supabaseClient
        .from('tour_dates')
        .select('*')
        .order('tour_date')
        .limit(1)
        .single();

      if (error) throw error;
      setNextTour(data);
    };

    loadDate();
  }, [supabaseClient]);

  return (
    <Box as="section">
      <Button
        size={['sm', 'md']}
        colorScheme="mapGreen"
        rightIcon={<Plus boxSize="5" />}>
        Neue Tour Daten erfassen
      </Button>
      <Divider borderColor="gray.500" my="3" />
      {nextTour && <NextTour {...nextTour} />}
    </Box>
  );
};

export default NextTourSection;
