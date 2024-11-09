'use client';

import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';

export default function Fact({ label, value }: { label: string; value: string }) {
	return (
		<Stat minW="20" wordBreak="break-word">
			<StatLabel fontWeight="light" whiteSpace="nowrap">
				{label}
			</StatLabel>
			<StatNumber fontSize={['md', 'lg']} whiteSpace="pre-wrap">
				{value}
			</StatNumber>
		</Stat>
	);
}
