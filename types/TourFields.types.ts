export type TourFields = {
	name: string;
	description: string;
	route: string;
	mapLink: string;
	mapImage: File | string;
	mapImageData: {
		width: number;
		height: number;
	};
	distance: string;
	ascent: string;
	descent: string;
	duration: string;
	start: string;
	end: string;
	pause: string;
};
