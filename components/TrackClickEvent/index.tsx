import React from 'react';
import { Box } from '@chakra-ui/react';

import { TrackingEvent } from 'types/TrackingEvent.types';

const TrackClickEvent = ({
  children,
  event,
  ...rest
}: {
  children: React.ReactNode;
  event: TrackingEvent;
}) => {
  return (
    <Box
      style={{ display: 'contents' }}
      {...rest}
      onClickCapture={() => {
        (
          window as Window &
            typeof globalThis & {
              Tellytics: {
                trackEvent: (event: TrackingEvent) => Promise<void>;
              };
            }
        ).Tellytics?.trackEvent(event);
      }}>
      {children}
    </Box>
  );
};

export default TrackClickEvent;
