import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldProps } from "formik";
import { Upload } from "icons";
import { useRef } from "react";

const UploadInput = ({
  label,
  placeholder,
  acceptedFileTypes,
  fieldProps,
}: {
  label: string;
  placeholder?: string;
  acceptedFileTypes: string;
  fieldProps: FieldProps;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const supabaseClient = useSupabaseClient();

  return (
    <FormControl
      isInvalid={
        (fieldProps.form.errors[fieldProps.field.name] &&
          fieldProps.form.touched[fieldProps.field.name]) as boolean
      }
    >
      <FormLabel>{label}</FormLabel>
      <input
        type="file"
        accept={acceptedFileTypes}
        ref={inputRef}
        onChange={(event) => {
          fieldProps.form.setFieldValue(
            fieldProps.field.name,
            (event &&
              event.currentTarget &&
              event.currentTarget.files &&
              event.currentTarget.files[0]) ||
              null
          );
        }}
        style={{ display: "none" }}
      />
      <Flex align="flex-start" gap="6">
        {fieldProps.field.value && (
          <Image
            alt="Bild der Karte"
            boxSize="125px"
            src={
              typeof fieldProps.field.value === "string"
                ? supabaseClient.storage
                    .from("map-images")
                    .getPublicUrl(fieldProps.field.value).data.publicUrl
                : URL.createObjectURL(fieldProps.field.value)
            }
          />
        )}
        <Button
          variant="outline"
          leftIcon={<Upload boxSize="5" />}
          onClick={() => {
            fieldProps.form.setTouched({ [fieldProps.field.name]: true });
            inputRef?.current?.click();
          }}
        >
          {placeholder || "Dokument hochladen..."}
        </Button>
      </Flex>
      <FormErrorMessage>
        {fieldProps.form.errors[fieldProps.field.name] as string}
      </FormErrorMessage>
    </FormControl>
  );
};

export default UploadInput;
