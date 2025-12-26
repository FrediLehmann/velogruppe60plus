import { TourFields } from 'types/TourFields.types';

export const defaultValues: TourFields = {
	name: '',
	description: '',
	route: '',
	mapLink: '',
	mapImage: '',
	mapImageData: { width: 0, height: 0 },
	gpxFile: '',
	distance: '',
	ascent: '',
	descent: '',
	duration: '',
	start: '',
	end: '',
	pause: ''
};
