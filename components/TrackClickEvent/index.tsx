import { TrackingEvent } from 'types/TrackingEvent.types';

const TrackClickEvent = ({
  children,
  event
}: {
  children: React.ReactNode;
  event: TrackingEvent;
}) => (
  <div
    onClickCapture={() => {
      (
        window as Window &
          typeof globalThis & {
            Tellytics: { trackEvent: (event: TrackingEvent) => Promise<void> };
          }
      ).Tellytics?.trackEvent(event);

      return true;
    }}
    style={{ display: 'contents' }}>
    {children}
  </div>
);

export default TrackClickEvent;
