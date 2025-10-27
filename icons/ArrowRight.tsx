import { Icon } from '@chakra-ui/react';

export default function ArrowRight(props: { [key: string]: unknown }) {
	return (
		<Icon
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</Icon>
	);
}
