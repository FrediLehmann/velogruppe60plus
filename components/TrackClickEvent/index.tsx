import { TrackingEvent } from 'types/TrackingEvent.types';

const TrackClickEvent = ({
  children,
  event
}: {
  children: React.ReactNode;
  event: TrackingEvent;
}) => (
  <div
    style={{ display: 'contents' }}
    onClickCapture={() => {
      (
        window as Window &
          typeof globalThis & {
            Tellytics: { trackEvent: (event: TrackingEvent) => Promise<void> };
          }
      ).Tellytics?.trackEvent(event);
    }}>
    {children}
  </div>
);

export default TrackClickEvent;
