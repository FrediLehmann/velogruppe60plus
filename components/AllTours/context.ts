import { createContext } from "react";
import { Tour } from "lib/types/tours.types";

export const ToursContext = createContext<{
  tours: Tour[];
  load: () => void;
}>({
  tours: [],
  load: () => {},
});
