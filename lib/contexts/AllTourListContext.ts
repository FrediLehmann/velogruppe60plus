import { createContext } from "react";
import { Tour } from "types/Tours.types";

export const AllTourListContext = createContext<{
  tours: Tour[];
}>({
  tours: [],
});
