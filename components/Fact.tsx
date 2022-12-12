import { Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';

const Fact = ({ label, value }: { label: string; value: string }) => {
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
};

export default Fact;
