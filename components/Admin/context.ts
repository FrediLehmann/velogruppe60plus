import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";
import { Tour } from "../../lib/tours.type";

export const ToursContext = createContext<{
  tours: Tour[];
  load: () => void;
  setNextTour: (id: number) => void;
}>({
  tours: [],
  load: () => {},
  setNextTour: (id) => {},
});
