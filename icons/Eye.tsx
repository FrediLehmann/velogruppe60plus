import { Icon } from '@chakra-ui/react';

export default function Eye(props: { [key: string]: unknown }) {
	return (
		<Icon
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
			<circle cx="12" cy="12" r="3" />
		</Icon>
	);
}
