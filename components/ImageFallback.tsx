import { Center, Spinner } from "@chakra-ui/react";
import { Image as ImageIcon } from "icons";

const ImageFallback = ({
  height,
  width = "auto",
}: {
  height: string;
  width?: string;
}) => {
  return (
    <Center
      h={height}
      w={width}
      minH={height}
      minW={width}
      bg="gray.200"
      color="gray.400"
      borderRadius="sm"
    >
      <Spinner />
    </Center>
  );
};

export default ImageFallback;
