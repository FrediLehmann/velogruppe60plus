import { createContext } from 'react';
import { Tour } from 'types/Tours.types';

export const AdminTourListContext = createContext<{
  tours: Tour[];
  page: number;
  setPage: (page: number) => void;
  load: (from: number, to: number) => void;
  totalTours: number;
  setNextTour: (id: number) => void;
  setPublished: (id: number, published: boolean) => void;
}>({
  tours: [],
  page: 1,
  setPage: _ => _,
  load: () => {},
  totalTours: 1,
  setNextTour: id => {},
  setPublished: (id, published) => {}
});
