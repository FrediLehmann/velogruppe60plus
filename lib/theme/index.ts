import { extendTheme } from "@chakra-ui/react";
import Input from "./Input";

export default extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  components: {
    Input,
  },
});
