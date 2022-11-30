import { Center } from "@chakra-ui/react";
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
      bg="gray.200"
      color="gray.400"
      borderRadius="sm"
    >
      <ImageIcon boxSize="10" />
    </Center>
  );
};

export default ImageFallback;
