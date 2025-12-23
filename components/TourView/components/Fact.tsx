'use client';

import { Stat } from '@chakra-ui/react';

export default function Fact({ label, value }: { label: string; value: string }) {
	return (
		<Stat.Root minW="20" wordBreak="break-word">
			<Stat.Label fontWeight="light" whiteSpace="nowrap">
				{label}
			</Stat.Label>
			<Stat.ValueText fontSize={['md', 'lg']} whiteSpace="pre-wrap">
				{value}
			</Stat.ValueText>
		</Stat.Root>
	);
}
