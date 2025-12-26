'use client';

import { Chart, useChart } from '@chakra-ui/charts';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Area, AreaChart, Tooltip, YAxis } from 'recharts';

import { createClient } from '@/lib/supabase/client';

export default function ElevationProfile({ gpxFilePath }: { gpxFilePath: string }) {
	const [elevationData, setElevationData] = useState<
		{
			value: number;
		}[]
	>([]);
	const supabase = createClient();

	useEffect(() => {
		const loadElevationData = async () => {
			try {
				const { data, error: fetchError } = await supabase.storage
					.from('map-data')
					.download(gpxFilePath);

				if (fetchError) {
					return;
				}

				const text = await data.text();
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(text, 'text/xml');

				const parserError = xmlDoc.querySelector('parsererror');
				if (parserError) {
					return;
				}

				const elevations: number[] = [];

				// Handle tracks (<trk> -> <trkseg> -> <trkpt>)
				const trackPoints = xmlDoc.querySelectorAll('trk > trkseg > trkpt');
				trackPoints.forEach((trkpt) => {
					const eleElement = trkpt.querySelector('ele');
					const ele = eleElement ? eleElement.textContent : null;

					if (ele) {
						elevations.push(Math.round(parseFloat(ele)));
					}
				});

				// Handle routes if no tracks found (<rte> -> <rtept>)
				if (elevations.length === 0) {
					const routePoints = xmlDoc.querySelectorAll('rte > rtept');
					routePoints.forEach((rtept) => {
						const eleElement = rtept.querySelector('ele');
						const ele = eleElement ? eleElement.textContent : null;

						if (ele) {
							elevations.push(Math.round(parseFloat(ele)));
						}
					});
				}

				if (elevations.length === 0) {
					return;
				}

				// Sample the data to reduce points for sparkline
				const sampledElevations: number[] = [];
				const sampleRate = Math.max(1, Math.floor(elevations.length / 50));

				for (let i = 0; i < elevations.length; i += sampleRate) {
					sampledElevations.push(elevations[i]);
				}

				// Ensure we include the last point
				if (
					elevations.length > 1 &&
					sampledElevations[sampledElevations.length - 1] !== elevations[elevations.length - 1]
				) {
					sampledElevations.push(elevations[elevations.length - 1]);
				}

				const elevationProfile: {
					value: number;
				}[] = sampledElevations.map((ele) => ({
					value: ele
				}));

				setElevationData(elevationProfile);
			} catch (err) {
				console.error('Error loading elevation data:', err);
			}
		};

		if (gpxFilePath) {
			loadElevationData();
		}
	}, [gpxFilePath, supabase.storage]);

	const chart = useChart({
		data: elevationData,
		series: [{ name: 'value', color: 'green.solid' }]
	});

	if (elevationData.length === 0) {
		return null;
	}

	const minElevation = Math.min(...elevationData.map((d) => d.value));
	const maxElevation = Math.max(...elevationData.map((d) => d.value));

	// Add padding (20% of the range) for better visualization
	const elevationRange = maxElevation - minElevation;
	const padding = elevationRange * 0.2;
	const yAxisMin = Math.floor(minElevation - padding);
	const yAxisMax = Math.ceil(maxElevation + padding);

	return (
		<Box width="full" height="12">
			<Chart.Root width="full" height="12" chart={chart}>
				<AreaChart data={chart.data}>
					<defs>
						<Chart.Gradient
							id="elevation-gradient"
							stops={[
								{ offset: '0%', color: 'green.solid', opacity: 0.8 },
								{ offset: '100%', color: 'green.solid', opacity: 0.2 }
							]}
						/>
					</defs>
					<YAxis domain={[yAxisMin, yAxisMax]} hide />
					<Tooltip
						cursor={{ stroke: chart.color('green.solid'), strokeWidth: 1 }}
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								return (
									<Box
										bg="white"
										p="2"
										borderRadius="md"
										boxShadow="md"
										border="1px solid"
										borderColor="gray.200">
										<Box fontSize="sm" fontWeight="medium">
											{payload[0].value} m ü. M.
										</Box>
									</Box>
								);
							}
							return null;
						}}
					/>
					{chart.series.map((item) => (
						<Area
							key={item.name}
							type="monotone"
							isAnimationActive={false}
							dataKey={chart.key(item.name)}
							fill="url(#elevation-gradient)"
							stroke={chart.color(item.color)}
							strokeWidth={2}
						/>
					))}
				</AreaChart>
			</Chart.Root>
		</Box>
	);
}
