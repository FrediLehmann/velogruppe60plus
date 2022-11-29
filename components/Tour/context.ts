import { createContext } from "react";
import { Tour } from "lib/types/tours.types";

export const TourContext = createContext<{
  tour: Tour;
  load: () => void;
}>({
  tour: {} as Tour,
  load: () => {},
});
