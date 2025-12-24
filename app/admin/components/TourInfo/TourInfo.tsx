import { Accordion, Badge, Flex } from '@chakra-ui/react';

import { TourView } from '@/components';
import { Tour } from '@/types/Tours.types';

import { TourOperations } from './components';

export default function TourInfo(tour: Tour) {
	return (
		<Accordion.Item value={tour.name}>
			<h2>
				<Accordion.ItemTrigger>
					<Flex
						align="center"
						flex="1"
						textAlign="left"
						fontSize="lg"
						fontWeight="semibold"
						gap="6">
						{tour.name}
						{tour.next_tour && (
							<Badge variant="outline" colorScheme="gray">
								Nächste Tour
							</Badge>
						)}
						{!tour.published && (
							<Badge variant="outline" colorScheme="blue">
								Nicht öffentlich
							</Badge>
						)}
					</Flex>
					<Accordion.ItemIndicator />
				</Accordion.ItemTrigger>
			</h2>
			<Accordion.ItemContent>
				<Accordion.ItemBody>
					<TourOperations tour={tour} />
					<TourView tour={tour} isAdmin />
				</Accordion.ItemBody>
			</Accordion.ItemContent>
		</Accordion.Item>
	);
}
