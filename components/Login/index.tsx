import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabaseClient = useSupabaseClient();
  const toast = useToast();

  return (
    <Container maxW="lg" mt={['32', '36']}>
      <Center>
        <Heading mb="8">Anmeldung</Heading>
      </Center>
      <Stack
        spacing="6"
        py={['0', '8']}
        px={['4', '10']}
        bg={['transparent', 'white']}
        boxShadow={['none', 'sm']}
        borderRadius={['none', 'xl']}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={object({
            email: string()
              .email('Invalide Email Addresse.')
              .required('Email Addresse wird benötigt.')
          })}
          onSubmit={async ({ email }) => {
            setIsSubmitting(true);

            const { error } = await supabaseClient.auth.signInWithOtp({
              email
            });

            if (error) {
              toast({
                title: 'Anmeldung fehlgeschlagen.',
                description: 'Wir konnten die Anmeldung nicht durchführen.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
              });
              setIsSubmitting(false);
              return;
            }

            toast({
              title: 'Anmeldung erfolgreich.',
              description: 'Wir haben Ihnen einen Link zum einloggen gesendet.',
              status: 'success',
              duration: 9000,
              isClosable: true,
              position: 'top'
            });
            setIsSubmitting(false);
          }}>
          {props => (
            <Form id="login">
              <Stack spacing="5">
                <Field name="email">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isRequired
                      isInvalid={
                        (form.errors.email && form.touched.email) as boolean
                      }>
                      <FormLabel>Email Addresse</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>
                        {form.errors?.email as string}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
            </Form>
          )}
        </Formik>
        <Button
          type="submit"
          form="login"
          colorScheme="mapGreen"
          isLoading={isSubmitting}>
          Einloggen
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
