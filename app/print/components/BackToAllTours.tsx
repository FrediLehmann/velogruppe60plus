'use client';

import { Button, Link } from '@chakra-ui/react';

import { TrackClickEvent } from '@/components';
import { ArrowLeft } from '@/icons';

export default function BackToAllTours() {
	return (
		<TrackClickEvent event={{ name: 'BACK_TO_TOURS_LINK_CLICK' }}>
			<Button asChild color="green.700" py="6" css={{ '@media print': { display: 'none' } }}>
				<Link href="/alle-touren">
					<ArrowLeft />
					Zurück zu allen Touren
				</Link>
			</Button>
		</TrackClickEvent>
	);
}
