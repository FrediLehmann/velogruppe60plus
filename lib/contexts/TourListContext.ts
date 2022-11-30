import { createContext } from "react";
import { Tour } from "types/Tours.types";

export const TourListContext = createContext<{
  tours: Tour[];
  load: () => void;
  setNextTour: (id: number) => void;
}>({
  tours: [],
  load: () => {},
  setNextTour: (id) => {},
});
