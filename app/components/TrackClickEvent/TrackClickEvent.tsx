'use client';

import React from 'react';

import { TrackingEvent } from 'types/TrackingEvent.types';

export default function TrackClickEvent({
  children,
  event,
  showBox = false
}: {
  children: React.ReactNode;
  event: TrackingEvent;
  showBox?: boolean;
}) {
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

  return (
    <div
      style={!showBox ? { display: 'contents' } : {}}
      onClickCapture={clickCapture}>
      {children}
    </div>
  );
}
