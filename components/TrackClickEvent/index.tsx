import React from 'react';

import { TrackingEvent } from 'types/TrackingEvent.types';

const TrackClickEvent = ({
  children,
  event
}: {
  children: React.ReactNode;
  event: TrackingEvent;
}) => {
  if (!children) return null;

  let Component = children as React.ReactElement;
  if (typeof children === 'string') Component = <>{children}</>;
  return React.cloneElement(Component, {
    onClickCapture: () => {
      (
        window as Window &
          typeof globalThis & {
            Tellytics: { trackEvent: (event: TrackingEvent) => Promise<void> };
          }
      ).Tellytics?.trackEvent(event);
    }
  });
};

export default TrackClickEvent;
