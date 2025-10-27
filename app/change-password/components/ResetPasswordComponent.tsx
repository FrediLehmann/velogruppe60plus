'use client';

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
import { Field, FieldProps, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { object, string } from 'yup';

import { TrackClickEvent } from '@/components';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordComponent() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const toast = useToast();

	const supabase = createClient();

	return (
		<Container maxW="lg" mt={['32', '36']}>
			<Center>
				<Heading mb="8">Reset Password</Heading>
			</Center>
			<Stack
				spacing="6"
				py={['0', '8']}
				px={['4', '10']}
				bg={['transparent', 'white']}
				boxShadow={['none', 'sm']}
				borderRadius={['none', 'xl']}>
				<Formik
					initialValues={{ password: '', passwordConfirmation: '' }}
					validationSchema={object({
						password: string()
							.required('Passwort wird benötigt.')
							.matches(
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/g,
								'Passwort muss mindestens 8 Zeichen lang sein, eine Zahl, ein Sonderzeichen, ein Großbuchstabe und ein Kleinbuchstabe enthalten.'
							),
						passwordConfirmation: string()
							.required('Bitte bestätigen sie ihr Passwort')
							.when(['password'], (password, schema) =>
								schema.test({
									test: (passwordConfirmation) => passwordConfirmation === password[0],
									message: 'Passwörter stimmen nicht überein.'
								})
							)
					})}
					onSubmit={async ({ password }) => {
						setIsSubmitting(true);
						const { error } = await supabase.auth.updateUser({
							password
						});

						if (error) {
							toast({
								title: 'Passwort änderun fehlgeschlgen.',
								description: 'Wir konnten das Passwort nicht ändern.',
								status: 'error',
								duration: 9000,
								isClosable: true,
								position: 'top'
							});
							setIsSubmitting(false);
							return;
						}
						router.push('/admin');
					}}>
					{() => (
						<Form id="login">
							<Stack spacing="5">
								<Field name="password">
									{({ field, form }: FieldProps) => (
										<FormControl
											isRequired
											isInvalid={(form.errors.password && form.touched.password) as boolean}>
											<FormLabel>Passwort</FormLabel>
											<Input type="password" autoComplete="password" {...field} />
											<FormErrorMessage>{form.errors?.password as string}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Field name="passwordConfirmation">
									{({ field, form }: FieldProps) => (
										<FormControl
											isRequired
											isInvalid={
												(form.errors.passwordConfirmation &&
													form.touched.passwordConfirmation) as boolean
											}>
											<FormLabel>Passwort bestätigen</FormLabel>
											<Input type="password" autoComplete="new-password" {...field} />
											<FormErrorMessage>
												{form.errors?.passwordConfirmation as string}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</Stack>
						</Form>
					)}
				</Formik>
				<TrackClickEvent event={{ name: 'ADMIN_LOGIN_BUTTON_CLICK' }}>
					<Button type="submit" form="login" colorScheme="mapGreen" isLoading={isSubmitting}>
						Ändern
					</Button>
				</TrackClickEvent>
			</Stack>
		</Container>
	);
}
