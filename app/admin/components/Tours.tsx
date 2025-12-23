'use client';

import {
	Accordion,
	Button,
	ButtonGroup,
	Center,
	Icon,
	IconButton,
	Skeleton
} from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';

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
					<IconButton
						disabled={page === 1}
						aria-label="Previous page"
						onClick={() => setPage(page - 1)}>
						<Icon boxSize={['4', '6']}>
							<FiChevronLeft />
						</Icon>
					</IconButton>
					{start >= 1 && (
						<IconButton
							aria-label=""
							disabled
							px="3"
							style={{ paddingInline: '0', width: '24px', minWidth: '24px' }}>
							<Icon boxSize={['4', '6']}>
								<FiMoreHorizontal />
							</Icon>
						</IconButton>
					)}
					{[...new Array(totalPages)].slice(start, end).map((_, index) => {
						const pageIndex = start + index + 1;
						return (
							<Button
								key={pageIndex}
								disabled={page === pageIndex}
								bg={page === pageIndex ? 'bgGray.100' : 'transparent'}
								onClick={() => page !== pageIndex && setPage(pageIndex)}
								css={{ '&:hover': { backgroundColor: 'bgGray.200' } }}>
								{pageIndex}
							</Button>
						);
					})}
					{end < totalPages && (
						<IconButton
							aria-label=""
							disabled
							px="3"
							style={{ paddingInline: '0', width: '24px', minWidth: '24px' }}>
							<Icon boxSize={['4', '6']}>
								<FiMoreHorizontal />
							</Icon>
						</IconButton>
					)}
					<IconButton
						disabled={page >= totalPages}
						aria-label="Next page"
						onClick={() => setPage(page + 1)}>
						<Icon boxSize={['4', '6']}>
							<FiChevronRight />
						</Icon>
					</IconButton>
				</ButtonGroup>
			</Center>
		</Accordion.Root>
	);
};

export default Tours;
