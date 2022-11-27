import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const Fact = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stat minW="20">
      <StatLabel fontWeight="light" whiteSpace="nowrap">
        {label}
      </StatLabel>
      <StatNumber fontSize={["sm", "lg"]}>{value}</StatNumber>
    </Stat>
  );
};

export default Fact;
