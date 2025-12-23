'use client';

import { Button, Center, Container, Field, Heading, Input, Stack } from '@chakra-ui/react';
import { FieldProps, Form, Formik, Field as FormikField } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { object, string } from 'yup';

import { TrackClickEvent } from '@/components';
import { toaster } from '@/components/ui/toaster';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordComponent() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const supabase = createClient();

	return (
		<Container maxW="lg" mt={['32', '36']}>
			<Center>
				<Heading mb="8">Reset Password</Heading>
			</Center>
			<Stack
				gap="6"
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
							toaster.create({
								title: 'Passwort änderun fehlgeschlgen.',
								description: 'Wir konnten das Passwort nicht ändern.',
								type: 'error',
								duration: 9000,
								closable: true
							});
							setIsSubmitting(false);
							return;
						}
						router.push('/admin');
					}}>
					{() => (
						<Form id="login">
							<Stack gap="5">
								<FormikField name="password">
									{({ field, form }: FieldProps) => (
										<Field.Root
											required
											invalid={(form.errors.password && form.touched.password) as boolean}>
											<Field.Label>
												Passwort
												<Field.RequiredIndicator />
											</Field.Label>
											<Input type="password" autoComplete="password" {...field} />
											<Field.ErrorText>{form.errors?.password as string}</Field.ErrorText>
										</Field.Root>
									)}
								</FormikField>
								<FormikField name="passwordConfirmation">
									{({ field, form }: FieldProps) => (
										<Field.Root
											required
											invalid={
												(form.errors.passwordConfirmation &&
													form.touched.passwordConfirmation) as boolean
											}>
											<Field.Label>
												Passwort bestätigen
												<Field.RequiredIndicator />
											</Field.Label>
											<Input type="password" autoComplete="new-password" {...field} />
											<Field.ErrorText>
												{form.errors?.passwordConfirmation as string}
											</Field.ErrorText>
										</Field.Root>
									)}
								</FormikField>
							</Stack>
						</Form>
					)}
				</Formik>
				<TrackClickEvent event={{ name: 'ADMIN_LOGIN_BUTTON_CLICK' }}>
					<Button type="submit" form="login" colorScheme="mapGreen" loading={isSubmitting}>
						Ändern
					</Button>
				</TrackClickEvent>
			</Stack>
		</Container>
	);
}
