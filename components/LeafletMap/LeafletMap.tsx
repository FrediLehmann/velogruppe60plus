'use client';

import { Box, Spinner, Text } from '@chakra-ui/react';
import parseGpx from 'gpx-parser-builder';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
	ssr: false
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
	ssr: false
});
const Polyline = dynamic(() => import('react-leaflet').then((mod) => mod.Polyline), {
	ssr: false
});
const useMap = dynamic(() => import('react-leaflet').then((mod) => mod.useMap as any), {
	ssr: false
});

// Import Leaflet CSS only on client side
if (typeof window !== 'undefined') {
	import('leaflet/dist/leaflet.css');
}

interface LeafletMapProps {
	gpxFilePath: string;
}

interface TrackPoint {
	lat: number;
	lng: number;
}

interface GpxPoint {
	$: {
		lat: string;
		lon: string;
	};
}

interface GpxSegment {
	trkpt: GpxPoint[];
}

interface GpxTrack {
	trkseg: GpxSegment[];
}

interface GpxRoute {
	rtept: GpxPoint[];
}

interface GpxData {
	trk?: GpxTrack[];
	rte?: GpxRoute[];
}

// Component to handle map bounds fitting
function MapBoundsHandler({ bounds }: { bounds: [[number, number], [number, number]] | null }) {
	const map = useMap();

	useEffect(() => {
		if (bounds && map) {
			map.fitBounds(bounds, { padding: [50, 50] });
		}
	}, [bounds, map]);

	return null;
}

export default function LeafletMap({ gpxFilePath }: LeafletMapProps) {
	const [trackPoints, setTrackPoints] = useState<TrackPoint[]>([]);
	const [bounds, setBounds] = useState<[[number, number], [number, number]] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const supabase = createClient();

	useEffect(() => {
		const loadGpxData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Fetch GPX file from Supabase Storage
				const { data, error: fetchError } = await supabase.storage
					.from('map-data')
					.download(gpxFilePath);

				if (fetchError) {
					throw new Error('GPX-Datei konnte nicht geladen werden');
				}

				// Convert blob to text
				const text = await data.text();

				// Parse GPX
				const gpx = parseGpx(text) as GpxData;

				// Extract track points
				const points: TrackPoint[] = [];

				// Handle tracks
				if (gpx.trk && gpx.trk.length > 0) {
					gpx.trk.forEach((track: GpxTrack) => {
						if (track.trkseg && track.trkseg.length > 0) {
							track.trkseg.forEach((segment: GpxSegment) => {
								if (segment.trkpt && segment.trkpt.length > 0) {
									segment.trkpt.forEach((point: GpxPoint) => {
										if (point.$.lat && point.$.lon) {
											points.push({
												lat: parseFloat(point.$.lat),
												lng: parseFloat(point.$.lon)
											});
										}
									});
								}
							});
						}
					});
				}

				// Handle routes if no tracks found
				if (points.length === 0 && gpx.rte && gpx.rte.length > 0) {
					gpx.rte.forEach((route: GpxRoute) => {
						if (route.rtept && route.rtept.length > 0) {
							route.rtept.forEach((point: GpxPoint) => {
								if (point.$.lat && point.$.lon) {
									points.push({
										lat: parseFloat(point.$.lat),
										lng: parseFloat(point.$.lon)
									});
								}
							});
						}
					});
				}

				if (points.length === 0) {
					throw new Error('Keine Trackpunkte in der GPX-Datei gefunden');
				}

				setTrackPoints(points);

				// Calculate bounds
				const lats = points.map((p) => p.lat);
				const lngs = points.map((p) => p.lng);
				const minLat = Math.min(...lats);
				const maxLat = Math.max(...lats);
				const minLng = Math.min(...lngs);
				const maxLng = Math.max(...lngs);

				setBounds([
					[minLat, minLng],
					[maxLat, maxLng]
				]);

				setLoading(false);
			} catch (err) {
				console.error('Error loading GPX:', err);
				setError(err instanceof Error ? err.message : 'Fehler beim Laden der GPX-Datei');
				setLoading(false);
			}
		};

		if (gpxFilePath) {
			loadGpxData();
		}
	}, [gpxFilePath, supabase.storage]);

	if (loading) {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="500px"
				bg="gray.50"
				borderRadius="md">
				<Spinner size="xl" color="green.600" />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="500px"
				bg="red.50"
				borderRadius="md"
				p="4">
				<Text color="red.600">{error}</Text>
			</Box>
		);
	}

	if (trackPoints.length === 0) {
		return null;
	}

	// Convert track points to Leaflet format
	const positions: [number, number][] = trackPoints.map((p) => [p.lat, p.lng]);

	return (
		<Box height="500px" width="100%" borderRadius="md" overflow="hidden">
			<MapContainer
				style={{ height: '100%', width: '100%' }}
				center={positions[0]}
				zoom={13}
				scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Polyline
					positions={positions}
					pathOptions={{
						color: '#2F855A',
						weight: 4,
						opacity: 0.8
					}}
				/>
				<MapBoundsHandler bounds={bounds} />
			</MapContainer>
		</Box>
	);
}
