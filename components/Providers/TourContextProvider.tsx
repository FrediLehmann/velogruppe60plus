'use client';

import { TourContext } from '@/lib/contexts/TourContext';
import { TourContextData } from '@/types/TourContext.types';

export default function Providers({
	children,
	...props
}: {
	children: React.ReactNode;
} & TourContextData) {
	return <TourContext.Provider value={props}>{children}</TourContext.Provider>;
}
