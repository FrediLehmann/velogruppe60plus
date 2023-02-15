import { createContext } from 'react';
import { TourDate } from 'types/TourDate.types';
import { Tour } from 'types/Tours.types';

export const AdminTourListContext = createContext<{
  tours: Tour[];
  totalTours: number;
  tourDate: TourDate;
  page: number;
  load: () => void;
  setPage: (page: number) => void;
  setNextTour: (id: number) => void;
  setPublished: (id: number, published: boolean) => void;
}>({
  tours: [],
  totalTours: 1,
  tourDate: {} as TourDate,
  page: 1,
  load: () => {},
  setPage: _ => _,
  setNextTour: id => {},
  setPublished: (id, published) => {}
});
