'use client';

import { Icon, Link } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

import { TrackClickEvent } from '@/components';

export default function BackToAllTours() {
	return (
		<TrackClickEvent event={{ name: 'BACK_TO_TOURS_LINK_CLICK' }}>
			<Link
				href="/alle-touren"
				color="green.700"
				py="6"
				css={{ '@media print': { display: 'none' } }}>
				<Icon boxSize="5">
					<FiArrowLeft />
				</Icon>
				Zurück zu allen Touren
			</Link>
		</TrackClickEvent>
	);
}
