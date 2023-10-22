import { TrackingEvent } from 'types/TrackingEvent.types';

const TrackClickEvent = ({
  children,
  event
}: {
  children: React.ReactNode;
  event: TrackingEvent;
}) => {
  // @ts-ignore
  children.props.onClickCapture = () => {
    (
      window as Window &
        typeof globalThis & {
          Tellytics: { trackEvent: (event: TrackingEvent) => Promise<void> };
        }
    ).Tellytics?.trackEvent(event);
  };

  return children;
};

export default TrackClickEvent;
