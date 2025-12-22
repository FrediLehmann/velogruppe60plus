'use client';

import { Portal } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { TrackingBanner } from './components/TrackingBanner';

declare global {
	interface Window {
		Tellytics: {
			acceptTracking: (accepted: boolean) => void;
		};
	}
}

export default function Tracking() {
	const [showBanner, setShowBanner] = useState(false);
	const hasShownRef = useRef(false);

	const accept = useCallback(() => {
		window.Tellytics?.acceptTracking(true);
		setShowBanner(false);
	}, []);

	const decline = useCallback(() => {
		window.Tellytics?.acceptTracking(false);
		setShowBanner(false);
	}, []);

	useEffect(() => {
		function handleTrackingLoaded(e: CustomEvent<{ acceptedTracking: boolean }>) {
			if (!e.detail.acceptedTracking && !hasShownRef.current) {
				hasShownRef.current = true;
				setShowBanner(true);
			}
		}

		document.addEventListener('tellyticsLoaded', handleTrackingLoaded as EventListener);

		return () => {
			document.removeEventListener('tellyticsLoaded', handleTrackingLoaded as EventListener);
		};
	}, []);

	if (!showBanner) return null;

	return (
		<Portal>
			<TrackingBanner onAccept={accept} onDecline={decline} />
		</Portal>
	);
}
