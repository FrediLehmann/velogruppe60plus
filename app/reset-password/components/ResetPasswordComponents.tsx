'use client';

import {
	Button,
	Center,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	useToast
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';

import { TrackClickEvent } from '@/components';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordComponents() {
	const supabase = createClient();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const toast = useToast();

	return (
		<Container maxW="lg" mt={['32', '36']}>
			<Center>
				<Heading mb="8">Passwort zurücksetzten</Heading>
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

						const { error } = await supabase.auth.resetPasswordForEmail(email, {
							redirectTo: `https://${window.location.host}/change-password`
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
							title: 'Passwort zurücksetzten.',
							description: 'Wir haben dir einen Link geschickt um ein neues Passwort zu erstellen.',
							status: 'success',
							duration: 9000,
							isClosable: true,
							position: 'top'
						});
					}}>
					{(_) => (
						<Form id="login">
							<Stack spacing="5">
								<Field name="email">
									{({ field, form }: FieldProps) => (
										<FormControl
											isRequired
											isInvalid={(form.errors.email && form.touched.email) as boolean}>
											<Flex justify="space-between">
												<FormLabel>Email Addresse</FormLabel>
												<Link href="/login" color="green.700" fontSize="sm">
													Zurück zum Login
												</Link>
											</Flex>
											<Input autoComplete="email" {...field} />
											<FormErrorMessage>{form.errors?.email as string}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</Stack>
						</Form>
					)}
				</Formik>
				<TrackClickEvent event={{ name: 'ADMIN_LOGIN_BUTTON_CLICK' }}>
					<Button type="submit" form="login" colorScheme="mapGreen" isLoading={isSubmitting}>
						Zurücksetzten
					</Button>
				</TrackClickEvent>
			</Stack>
		</Container>
	);
}
