import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const Fact = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stat>
      <StatLabel fontWeight="light" wordBreak="break-all">
        {label}
      </StatLabel>
      <StatNumber fontSize={["sm", "lg"]} wordBreak="break-all">
        {value}
      </StatNumber>
    </Stat>
  );
};

export default Fact;
