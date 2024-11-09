import { Icon } from '@chakra-ui/react';

export default function ChevronLeft(props: any) {
	return (
		<Icon
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<polyline points="15 18 9 12 15 6" />
		</Icon>
	);
}
