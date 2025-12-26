export type Tour = {
	id: number;
	name: string;
	description: string;
	route: string;
	mapUrl: string;
	startPoint: string;
	endPoint: string;
	pause: string;
	distance: string;
	ascent: string;
	descent: string;
	duration: string;
	next_tour: boolean;
	image_data?: { path: string; width: number; height: number } | null;
	map_data?: { gpxPath: string; updated_at?: string } | null;
	published?: boolean;
};
