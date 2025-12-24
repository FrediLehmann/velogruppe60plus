'use client';

import { Box, Spinner, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FiPlay, FiSquare } from 'react-icons/fi';

import { createClient } from '@/lib/supabase/client';

interface LeafletMapProps {
	gpxFilePath: string;
}

interface TrackPoint {
	lat: number;
	lng: number;
}

export default function LeafletMap({ gpxFilePath }: LeafletMapProps) {
	const mapRef = useRef<any>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const [trackPoints, setTrackPoints] = useState<TrackPoint[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [leafletLoaded, setLeafletLoaded] = useState(false);
	const supabase = createClient();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			import('leaflet').then(() => {
				setLeafletLoaded(true);
			});
		}
	}, []);

	useEffect(() => {
		const loadGpxData = async () => {
			try {
				setLoading(true);
				setError(null);

				const { data, error: fetchError } = await supabase.storage
					.from('map-data')
					.download(gpxFilePath);

				if (fetchError) {
					throw new Error('GPX-Datei konnte nicht geladen werden');
				}

				const text = await data.text();

				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(text, 'text/xml');

				const parserError = xmlDoc.querySelector('parsererror');
				if (parserError) {
					throw new Error('GPX-Datei konnte nicht geparst werden');
				}

				const points: TrackPoint[] = [];

				// Handle tracks (<trk> -> <trkseg> -> <trkpt>)
				const trackPoints = xmlDoc.querySelectorAll('trk > trkseg > trkpt');
				trackPoints.forEach((trkpt) => {
					const lat = trkpt.getAttribute('lat');
					const lon = trkpt.getAttribute('lon');
					if (lat && lon) {
						points.push({
							lat: parseFloat(lat),
							lng: parseFloat(lon)
						});
					}
				});

				// Handle routes if no tracks found (<rte> -> <rtept>)
				if (points.length === 0) {
					const routePoints = xmlDoc.querySelectorAll('rte > rtept');
					routePoints.forEach((rtept) => {
						const lat = rtept.getAttribute('lat');
						const lon = rtept.getAttribute('lon');
						if (lat && lon) {
							points.push({
								lat: parseFloat(lat),
								lng: parseFloat(lon)
							});
						}
					});
				}

				if (points.length === 0) {
					throw new Error('Keine Trackpunkte in der GPX-Datei gefunden');
				}

				setTrackPoints(points);
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

	useEffect(() => {
		if (
			!leafletLoaded ||
			!mapContainerRef.current ||
			loading ||
			error ||
			trackPoints.length === 0
		) {
			return;
		}

		const initMap = async () => {
			const L = (await import('leaflet')).default;

			if (!mapRef.current) {
				const map = L.map(mapContainerRef.current!, {
					center: [trackPoints[0].lat, trackPoints[0].lng],
					zoom: 13,
					scrollWheelZoom: true
				});

				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);

				mapRef.current = map;
			}

			const map = mapRef.current;

			const positions: [number, number][] = trackPoints.map((p) => [p.lat, p.lng]);
			const polyline = L.polyline(positions, {
				color: '#2F855A',
				weight: 4,
				opacity: 0.8
			}).addTo(map);

			// Create custom icons for start and end markers using react-icons
			const startIconSvg = renderToStaticMarkup(<FiPlay size={10} fill="white" stroke="white" />);
			const endIconSvg = renderToStaticMarkup(<FiSquare size={10} fill="white" stroke="white" />);

			const startIcon = L.divIcon({
				html: `<div style="
					background-color: #22543D;
					color: white;
					width: 20px;
					height: 20px;
					border-radius: 50% 50% 50% 0;
					transform: rotate(-45deg);
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1px solid white;
					box-shadow: 0 2px 5px rgba(0,0,0,0.3);
				">
					<div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center; margin-left: 1px;">${startIconSvg}</div>
				</div>`,
				className: '',
				iconSize: [28, 28],
				iconAnchor: [14, 28],
				popupAnchor: [0, -28]
			});

			const endIcon = L.divIcon({
				html: `<div style="
					background-color: #C53030;
					color: white;
					width: 20px;
					height: 20px;
					border-radius: 50% 50% 50% 0;
					transform: rotate(-45deg);
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1px solid white;
					box-shadow: 0 2px 5px rgba(0,0,0,0.3);
				">
					<div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">${endIconSvg}</div>
				</div>`,
				className: '',
				iconSize: [28, 28],
				iconAnchor: [14, 28],
				popupAnchor: [0, -28]
			});

			// Add start marker
			const startMarker = L.marker([positions[0][0], positions[0][1]], {
				icon: startIcon
			}).addTo(map);
			startMarker.bindPopup('<strong>Start</strong>');

			// Add end marker
			const endMarker = L.marker(
				[positions[positions.length - 1][0], positions[positions.length - 1][1]],
				{ icon: endIcon }
			).addTo(map);
			endMarker.bindPopup('<strong>Ziel</strong>');

			const bounds = polyline.getBounds();
			map.fitBounds(bounds);

			mapRef.current._polyline = polyline;
			mapRef.current._startMarker = startMarker;
			mapRef.current._endMarker = endMarker;
		};

		initMap();

		return () => {
			if (mapRef.current?._polyline) {
				mapRef.current._polyline.remove();
			}
			if (mapRef.current?._startMarker) {
				mapRef.current._startMarker.remove();
			}
			if (mapRef.current?._endMarker) {
				mapRef.current._endMarker.remove();
			}
		};
	}, [trackPoints, loading, error, leafletLoaded]);

	useEffect(() => {
		if (!mapRef.current || !mapContainerRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && mapRef.current) {
						setTimeout(() => {
							mapRef.current?.invalidateSize();
							if (mapRef.current?._polyline) {
								const bounds = mapRef.current._polyline.getBounds();
								mapRef.current.fitBounds(bounds);
							}
						}, 100);
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(mapContainerRef.current);

		return () => {
			observer.disconnect();
		};
	}, [leafletLoaded, trackPoints]);

	useEffect(() => {
		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, []);

	if (loading || !leafletLoaded) {
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

	return (
		<Box height="500px" width="100%" borderRadius="md" overflow="hidden">
			<div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
		</Box>
	);
}
