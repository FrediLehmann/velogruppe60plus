import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import UploadInput from "components/UploadInput";
import { Field, FieldProps, Form, Formik } from "formik";
import { object, string } from "yup";

interface TourFields {
  name: string;
  description: string;
  mapLink: string;
  mapImage: File | string;
  distance: string;
  ascent: string;
  descent: string;
  duration: string;
  start: string;
  end: string;
  pause: string;
}

const TourForm = ({
  initialValues = {
    name: "",
    description: "",
    mapLink: "",
    mapImage: "",
    distance: "",
    ascent: "",
    descent: "",
    duration: "",
    start: "",
    end: "",
    pause: "",
  },
  submit,
  formName,
}: {
  initialValues?: TourFields;
  submit: (values: TourFields) => Promise<void>;
  formName: string;
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={object({
        name: string().required("Name wird benötigt."),
        description: string().required("Beschreibung wird benötigt."),
        mapLink: string()
          .url("Inkorrekt formatierte Url")
          .required("Url wird benötigt"),
        mapImage: string().nullable().required("Bild wird benötigt"),
        distance: string().required("Distanz wird benötigt"),
        ascent: string().required("Aufstieg wird benötigt"),
        descent: string().required("Abstieg wird benötigt"),
        duration: string().required("Dauer wird benötigt"),
        start: string().required("Start ort wird benötigt"),
        end: string().required("Zielpunkt wird benötigt"),
        pause: string().required("Pause wird benötigt"),
      })}
      onSubmit={submit}
    >
      {(props) => (
        <Form id={formName}>
          <Stack spacing="5">
            <Field name="name">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={(form.errors.name && form.touched.name) as boolean}
                >
                  <FormLabel>Name</FormLabel>
                  <Input {...field} background="white" />
                  <FormErrorMessage>
                    {form.errors?.name as string}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={
                    (form.errors.description &&
                      form.touched.description) as boolean
                  }
                >
                  <FormLabel>Beschreibung</FormLabel>
                  <Textarea {...field} background="white" />
                  <FormErrorMessage>
                    {form.errors?.description as string}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="mapLink">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={
                    (form.errors.mapLink && form.touched.mapLink) as boolean
                  }
                >
                  <FormLabel>Url zur Schweiz Mobil Karte</FormLabel>
                  <Input {...field} background="white" />
                  <FormErrorMessage>
                    {form.errors?.mapLink as string}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="mapImage">
              {(fieldProps: FieldProps) => (
                <UploadInput
                  label="Bild der Karte"
                  placeholder="Bild hochladen..."
                  acceptedFileTypes="image/png, image/jpeg"
                  fieldProps={fieldProps}
                />
              )}
            </Field>
            <HStack spacing="4">
              <Field name="start">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      (form.errors.start && form.touched.start) as boolean
                    }
                  >
                    <FormLabel>Startpunk</FormLabel>
                    <Input {...field} background="white" />
                    <FormErrorMessage>
                      {form.errors?.start as string}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="end">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={(form.errors.end && form.touched.end) as boolean}
                  >
                    <FormLabel>Endpunkt</FormLabel>
                    <Input {...field} background="white" />
                    <FormErrorMessage>
                      {form.errors?.end as string}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </HStack>
            <Field name="pause">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={
                    (form.errors.pause && form.touched.pause) as boolean
                  }
                >
                  <FormLabel>Pausenort</FormLabel>
                  <Textarea {...field} background="white" />
                  <FormErrorMessage>
                    {form.errors?.pause as string}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <HStack spacing="4">
              <Field name="distance">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      (form.errors.distance && form.touched.distance) as boolean
                    }
                  >
                    <FormLabel>Distanz</FormLabel>
                    <Input {...field} background="white" />
                    <FormErrorMessage>
                      {form.errors?.distance as string}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="duration">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      (form.errors.duration && form.touched.duration) as boolean
                    }
                  >
                    <FormLabel>Dauer</FormLabel>
                    <Input {...field} background="white" />
                    <FormErrorMessage>
                      {form.errors?.duration as string}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </HStack>
            <HStack spacing="4">
              <Field name="ascent">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      (form.errors.ascent && form.touched.ascent) as boolean
                    }
                  >
                    <FormLabel>Aufstieg</FormLabel>
                    <Input {...field} background="white" />
                    <FormErrorMessage>
                      {form.errors?.ascent as string}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="descent">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      (form.errors.descent && form.touched.descent) as boolean
                    }
                  >
                    <FormLabel>Abstieg</FormLabel>
                    <Input {...field} background="white" />
                    <FormErrorMessage>
                      {form.errors?.descent as string}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </HStack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default TourForm;
