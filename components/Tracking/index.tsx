import { useCallback, useEffect, useRef } from 'react';
import { Box, useToast, Text, Flex, Button, ToastId } from '@chakra-ui/react';

declare global {
  interface Window {
    Tellytics: {
      acceptTracking: (accepted: boolean) => void;
    };
  }
}

export default function Tracking() {
  const toast = useToast();
  const toastIdRef = useRef<undefined | ToastId>();

  const accept = useCallback(() => {
    window.Tellytics?.acceptTracking(true);

    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }, [toast]);

  const decline = useCallback(() => {
    window.Tellytics?.acceptTracking(false);

    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }, [toast]);

  useEffect(() => {
    function handleTrackingLoaded(e: CustomEvent<any>) {
      if (!e.detail.acceptedTracking) {
        toastIdRef.current = toast({
          position: 'bottom-right',
          duration: null,
          render: () => (
            <Box
              mb={[5]}
              px={[4]}
              py={[3]}
              background="gray.50"
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.300">
              <Text>
                Wir nutzen Tracking um die Nutzung unserer Website zu
                analysieren und zu verbessern. Sie können die Nutzung von
                Tracking hier akzeptieren oder ablehnen.
              </Text>
              <Flex mt="4" gap="2">
                <Button colorScheme="mapGreen" onClick={accept}>
                  Teilnehmen
                </Button>
                <Button onClick={decline}>Nicht Teilnehmen</Button>
              </Flex>
            </Box>
          )
        });
      }
    }

    document.addEventListener(
      'tellyticsLoaded',
      handleTrackingLoaded as EventListener
    );

    return () => {
      document.removeEventListener(
        'tellyticsLoaded',
        handleTrackingLoaded as EventListener
      );
    };
  }, [accept, decline, toast]);

  return null;
}
