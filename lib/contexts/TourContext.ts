import { createContext } from 'react';

import { TourContextData } from '@/types/TourContext.types';
import { TourDate } from '@/types/TourDate.types';
import { Tour } from '@/types/Tours.types';

export const TourContext = createContext<TourContextData>({
  tour: {} as Tour,
  tourDate: {} as TourDate,
  load: () => {}
});
