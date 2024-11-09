import { Icon } from '@chakra-ui/react';

export default function ChevronRight(props: any) {
	return (
		<Icon
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<polyline points="9 18 15 12 9 6" />
		</Icon>
	);
}
