import { Icon } from '@chakra-ui/react';

export default function Slash(props: any) {
	return (
		<Icon
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<circle cx="12" cy="12" r="10" />
			<line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
		</Icon>
	);
}
