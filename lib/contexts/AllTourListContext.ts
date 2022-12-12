import { createContext } from 'react';
import { Tour } from 'types/Tours.types';

export const AllTourListContext = createContext<{
  tours: Tour[];
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  totalTours: number;
}>({
  tours: [],
  page: 1,
  setPage: _ => _,
  isLoading: false,
  totalTours: 1
});
