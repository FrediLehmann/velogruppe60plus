import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { PasswordField } from "components";
import { Field, FieldProps, Form, Formik } from "formik";
import { useState } from "react";
import { object, string } from "yup";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Container maxW="lg">
      <Center>
        <Stack
          spacing="6"
          py={["0", "8"]}
          px={["4", "10"]}
          bg={["transparent", "white"]}
          boxShadow={["none", "md"]}
          borderRadius={["none", "xl"]}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={object({
              email: string()
                .email("Invalide Email Addresse.")
                .required("Email Addresse wird benötigt."),
              password: string()
                .min(6, "Passwort ist zu kurz.")
                .required("Passwort wird benötigt."),
            })}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              console.log(values);
            }}
          >
            {(props) => (
              <Form id="login">
                <Stack spacing="5">
                  <Field name="email">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          (form.errors.email && form.touched.email) as boolean
                        }
                      >
                        <FormLabel>Email Addresse</FormLabel>
                        <Input {...field} background="white" />
                        <FormErrorMessage>
                          {form.errors?.email as string}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }: FieldProps) => (
                      <PasswordField
                        isInvalid={
                          (form.errors.password &&
                            form.touched.password) as boolean
                        }
                        errorMessage={form.errors?.password as string}
                        field={field}
                      />
                    )}
                  </Field>
                </Stack>
              </Form>
            )}
          </Formik>
          <Button
            type="submit"
            form="login"
            colorScheme="blue"
            isLoading={isSubmitting}
          >
            Einloggen
          </Button>
        </Stack>
      </Center>
    </Container>
  );
};

export default Login;
