import { createContext } from 'react';
import { Tour } from 'types/Tours.types';

export const TourContext = createContext<{
  tour: Tour;
  load: () => void;
}>({
  tour: {} as Tour,
  load: () => {}
});
