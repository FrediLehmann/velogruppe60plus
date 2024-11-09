import { Center, Spinner } from '@chakra-ui/react';

export default function ImageFallback({
	height,
	width = 'auto'
}: {
	height: string;
	width?: string;
}) {
	return (
		<Center
			h={height}
			w={width}
			minH={height}
			minW={width}
			bg="gray.200"
			color="gray.400"
			borderRadius="sm">
			<Spinner />
		</Center>
	);
}
