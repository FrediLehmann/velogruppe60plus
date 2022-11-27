import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { Eye, EyeClosed } from "icons";
import { forwardRef, useRef } from "react";

const PasswordField = forwardRef<
  HTMLInputElement,
  InputProps & {
    errorMessage: string;
    field: any;
    isRequired?: boolean;
    helperMessage?: string;
  }
>(
  (
    { errorMessage, isInvalid, field, isRequired = false, helperMessage },
    ref
  ) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) inputRef.current.focus({ preventScroll: true });
    };

    return (
      <FormControl isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <EyeClosed boxSize="5" /> : <Eye boxSize="5" />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            {...field}
            ref={mergeRef}
            type={isOpen ? "text" : "password"}
            background="white"
            autoComplete="current-password"
          />
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
      </FormControl>
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
