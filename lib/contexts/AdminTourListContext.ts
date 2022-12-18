import { createContext } from 'react';
import { Tour } from 'types/Tours.types';

export const AdminTourListContext = createContext<{
  tours: Tour[];
  load: () => void;
  setNextTour: (id: number) => void;
  setPublished: (id: number, published: boolean) => void;
}>({
  tours: [],
  load: () => {},
  setNextTour: id => {},
  setPublished: (id, published) => {}
});
