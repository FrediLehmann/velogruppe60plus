'use client';

import { Accordion, Button, ButtonGroup, Center, IconButton, Skeleton } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';

import { TrackClickEvent } from '@/components';
import { ChevronLeft, ChevronRight, MoreHorizontal } from '@/icons';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';

import { TourInfo } from '.';

const Tours = () => {
	const { page, tours, totalTours, setPage } = useContext(AdminTourListContext);
	const totalPages = Math.ceil(totalTours / 10);

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

	if (tours.length === 0) return <Skeleton h="xl" />;
	return (
		<Accordion.Root multiple mt="8">
			{tours?.map((tour, index) => (
				<TourInfo key={index} {...tour} />
			))}
			<Center mt="8">
				<ButtonGroup size={['md', 'lg']} variant="outline" attached>
					<TrackClickEvent event={{ name: 'ADMIN_PAGINATION_PREV' }} showBox={true}>
						<IconButton
							disabled={page === 1}
							aria-label="Previous page"
							onClick={() => setPage(page - 1)}>
							<ChevronLeft boxSize={['4', '6']} />
						</IconButton>
					</TrackClickEvent>
					{start >= 1 && (
						<IconButton
							aria-label=""
							disabled
							px="3"
							style={{ paddingInline: '0', width: '24px', minWidth: '24px' }}>
							<ChevronRight boxSize={['4', '6']} />
						</IconButton>
					)}
					{[...new Array(totalPages)].slice(start, end).map((_, index) => {
						const pageIndex = start + index + 1;
						return (
							<TrackClickEvent
								key={index}
								showBox={true}
								event={{ name: `ADMIN_PAGINATION_PAGE_${index}` }}>
								<Button
									key={pageIndex}
									disabled={page === pageIndex}
									bg={page === pageIndex ? 'gray.100' : 'transparent'}
									onClick={() => page !== pageIndex && setPage(pageIndex)}>
									{pageIndex}
								</Button>
							</TrackClickEvent>
						);
					})}
					{end < totalPages && (
						<IconButton
							aria-label=""
							disabled
							px="3"
							style={{ paddingInline: '0', width: '24px', minWidth: '24px' }}>
							<ChevronRight boxSize={['4', '6']} />
						</IconButton>
					)}
					<TrackClickEvent event={{ name: 'ADMIN_PAGINATION_NEXT' }} showBox={true}>
						<IconButton
							disabled={page >= totalPages}
							aria-label="Next page"
							onClick={() => setPage(page + 1)}>
							<ChevronRight boxSize={['4', '6']} />
						</IconButton>
					</TrackClickEvent>
				</ButtonGroup>
			</Center>
		</Accordion.Root>
	);
};

export default Tours;
