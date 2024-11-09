import { TourDate } from './TourDate.types';
import { Tour } from './Tours.types';

export type TourContextData = {
	tour: Tour;
	tourDate: TourDate;
	load?: () => void;
};
