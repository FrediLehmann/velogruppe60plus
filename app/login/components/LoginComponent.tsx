'use client';

import { useState } from 'react';
import { object, string } from 'yup';
import { Field, FieldProps, Form, Formik } from 'formik';
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

import { TrackClickEvent } from '@/components';
import { createClient } from '@/lib/supabase/client';

export default function LoginComponent() {
  const supabase = createClient();

  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

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

            const { error } = await supabase.auth.signInWithOtp({
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
          {_ => (
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
        <TrackClickEvent event={{ name: 'ADMIN_LOGIN_BUTTON_CLICK' }}>
          <Button
            type="submit"
            form="login"
            colorScheme="mapGreen"
            isLoading={isSubmitting}>
            Einloggen
          </Button>
        </TrackClickEvent>
      </Stack>
    </Container>
  );
}
