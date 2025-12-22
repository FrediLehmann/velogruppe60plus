'use client';

import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Container,
	Flex,
	Heading,
	IconButton,
	Link,
	Skeleton,
	Text
} from '@chakra-ui/react';
import { useContext, useMemo } from 'react';

import { TrackClickEvent } from '@/components';
import { ChevronLeft, ChevronRight, MoreHorizontal, Print as PrintIcon } from '@/icons';
import { AllTourListContext } from '@/lib/contexts/AllTourListContext';

import { Tour } from './components';

export default function AllTours() {
	const { page, tours, totalTours, isLoading } = useContext(AllTourListContext);

	const totalPages = useMemo(() => Math.ceil(totalTours / 10), [totalTours]);
	const { start, end } = useMemo(() => {
		let start = Math.max(0, page - 3);
		let end = Math.min(totalPages, page + 2);

		if (end - start < 5) {
			if (start === 0) {
				end = Math.min(totalPages, 5);
			} else if (end === totalPages) {
				start = Math.max(0, totalPages - 5);
			}
		}

		return { start, end };
	}, [totalPages, page]);

	return (
		<Container maxW="container.md" mt={['4', '6', '12']}>
			<Flex align="flex-end" justify="space-between" mb="8">
				<Box>
					<Heading as="h1" fontSize={['lg', 'xl']}>
						Alle Touren
					</Heading>
					<Text fontSize="sm" fontWeight="semibold" color="gray.700">
						{totalTours} Touren
					</Text>
				</Box>
				<TrackClickEvent event={{ name: 'NAVIGATE_TO_PRINT_TOURS_BUTTON_CLICK' }}>
					<Button asChild>
						<Link href="/print">
							<PrintIcon />
							Drucken
						</Link>
					</Button>
				</TrackClickEvent>
			</Flex>
			<Flex gap={['4', '6']} direction="column">
				{isLoading
					? [...new Array(10)].map((_, index) => <Skeleton key={index} h="168" />)
					: tours.map((tour, index) => <Tour key={index} {...tour} />)}
			</Flex>
			<Center mt="8">
				<ButtonGroup size={['md', 'lg']} variant="outline" attached>
					{/* Previous Page Button - Use Link for crawlability */}
					{page === 1 ? (
						<IconButton disabled={true} aria-label="Previous page">
							<ChevronLeft boxSize={['4', '6']} />
						</IconButton>
					) : (
						<IconButton asChild aria-label="Previous page">
							<Link href={page === 2 ? '/alle-touren' : `/alle-touren?page=${page - 1}`}>
								<ChevronLeft boxSize={['4', '6']} />
							</Link>
						</IconButton>
					)}

					{start >= 1 && (
						<IconButton
							aria-label=""
							disabled
							px="3"
							style={{ paddingInline: '0', width: '24px', minWidth: '24px' }}>
							<MoreHorizontal boxSize={['4', '6']} />
						</IconButton>
					)}

					{/* Page Number Buttons - Use Links for crawlability */}
					{[...new Array(totalPages)].slice(start, end).map((_, index) => {
						const pageIndex = start + index + 1;
						const isCurrentPage = page === pageIndex;

						return isCurrentPage ? (
							<Button key={pageIndex} disabled={true} bg="gray.100">
								{pageIndex}
							</Button>
						) : (
							<Button key={pageIndex} asChild bg="transparent">
								<Link href={pageIndex === 1 ? '/alle-touren' : `/alle-touren?page=${pageIndex}`}>
									{pageIndex}
								</Link>
							</Button>
						);
					})}

					{end < totalPages && (
						<IconButton
							aria-label=""
							disabled
							px="3"
							style={{ paddingInline: '0', width: '24px', minWidth: '24px' }}>
							<MoreHorizontal boxSize={['4', '6']} />
						</IconButton>
					)}

					{/* Next Page Button - Use Link for crawlability */}
					{page >= totalPages ? (
						<IconButton disabled={true} aria-label="Next page">
							<ChevronRight boxSize={['4', '6']} />
						</IconButton>
					) : (
						<IconButton asChild aria-label="Next page">
							<Link href={`/alle-touren?page=${page + 1}`}>
								<ChevronRight boxSize={['4', '6']} />
							</Link>
						</IconButton>
					)}
				</ButtonGroup>
			</Center>
		</Container>
	);
}
