'use client';

import { Link } from '@chakra-ui/next-js';
import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Container,
	Flex,
	Heading,
	IconButton,
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
					<Button href="/print" as={Link} leftIcon={<PrintIcon />}>
						Drucken
					</Button>
				</TrackClickEvent>
			</Flex>
			<Flex gap={['4', '6']} direction="column">
				{isLoading
					? [...new Array(10)].map((_, index) => <Skeleton key={index} h="168" />)
					: tours.map((tour, index) => <Tour key={index} {...tour} />)}
			</Flex>
			<Center mt="8">
				<ButtonGroup size={['md', 'lg']} variant="outline" isAttached>
					{/* Previous Page Button - Use Link for crawlability */}
					{page === 1 ? (
						<IconButton
							isDisabled={true}
							aria-label="Previous page"
							icon={<ChevronLeft boxSize={['4', '6']} />}
						/>
					) : (
						<IconButton
							as={Link}
							href={page === 2 ? '/alle-touren' : `/alle-touren?page=${page - 1}`}
							aria-label="Previous page"
							icon={<ChevronLeft boxSize={['4', '6']} />}
						/>
					)}

					{start >= 1 && (
						<IconButton
							aria-label=""
							isDisabled
							px="3"
							icon={<MoreHorizontal boxSize={['4', '6']} />}
							style={{ paddingInline: '0', width: '24px', minWidth: '24px' }}
						/>
					)}

					{/* Page Number Buttons - Use Links for crawlability */}
					{[...new Array(totalPages)].slice(start, end).map((_, index) => {
						const pageIndex = start + index + 1;
						const isCurrentPage = page === pageIndex;

						return isCurrentPage ? (
							<Button key={pageIndex} isDisabled={true} bg="gray.100">
								{pageIndex}
							</Button>
						) : (
							<Button
								key={pageIndex}
								as={Link}
								href={pageIndex === 1 ? '/alle-touren' : `/alle-touren?page=${pageIndex}`}
								bg="transparent">
								{pageIndex}
							</Button>
						);
					})}

					{end < totalPages && (
						<IconButton
							aria-label=""
							isDisabled
							px="3"
							icon={<MoreHorizontal boxSize={['4', '6']} />}
							style={{ paddingInline: '0', width: '24px', minWidth: '24px' }}
						/>
					)}

					{/* Next Page Button - Use Link for crawlability */}
					{page >= totalPages ? (
						<IconButton
							isDisabled={true}
							aria-label="Next page"
							icon={<ChevronRight boxSize={['4', '6']} />}
						/>
					) : (
						<IconButton
							as={Link}
							href={`/alle-touren?page=${page + 1}`}
							aria-label="Next page"
							icon={<ChevronRight boxSize={['4', '6']} />}
						/>
					)}
				</ButtonGroup>
			</Center>
		</Container>
	);
}
