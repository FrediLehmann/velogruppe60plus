import { createContext } from 'react';
import { TourDate } from 'types/TourDate.types';
import { Tour } from 'types/Tours.types';

export const TourContext = createContext<{
  tour: Tour;
  tourDate: TourDate;
  load: () => void;
}>({
  tour: {} as Tour,
  tourDate: {} as TourDate,
  load: () => {}
});
