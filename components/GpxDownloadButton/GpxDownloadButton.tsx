'use client';

import { Button, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

import { createClient } from '@/lib/supabase/client';

export default function GpxDownloadButton({
	gpxFilePath,
	tourName
}: {
	gpxFilePath: string;
	tourName?: string;
}) {
	const [downloading, setDownloading] = useState(false);
	const supabase = createClient();

	const handleDownload = async () => {
		try {
			setDownloading(true);

			// Get public URL from Supabase Storage
			const { data } = supabase.storage.from('gpx-files').getPublicUrl(gpxFilePath);

			if (!data.publicUrl) {
				throw new Error('GPX-Datei konnte nicht gefunden werden');
			}

			// Fetch the file
			const response = await fetch(data.publicUrl);
			if (!response.ok) {
				throw new Error('GPX-Datei konnte nicht heruntergeladen werden');
			}

			const blob = await response.blob();

			// Create download link
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = tourName ? `${tourName}.gpx` : 'tour.gpx';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading GPX:', error);
			alert('Fehler beim Herunterladen der GPX-Datei');
		} finally {
			setDownloading(false);
		}
	};

	return (
		<Button
			onClick={handleDownload}
			colorScheme="green"
			variant="outline"
			size="sm"
			loading={downloading}
			loadingText="Wird heruntergeladen...">
			<Icon boxSize="4">
				<FiDownload />
			</Icon>
			GPX herunterladen
		</Button>
	);
}
