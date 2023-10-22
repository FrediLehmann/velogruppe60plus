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
  function clickCapture() {
    (
      window as Window &
        typeof globalThis & {
          Tellytics: {
            trackEvent: (event: TrackingEvent) => Promise<void>;
          };
        }
    ).Tellytics?.trackEvent(event);
  }

  if (Object.keys(rest).length > 0)
    return (
      <Box {...rest} onClickCapture={clickCapture}>
        {children}
      </Box>
    );

  return (
    <Box style={{ display: 'contents' }} onClickCapture={clickCapture}>
      {children}
    </Box>
  );
};

export default TrackClickEvent;
