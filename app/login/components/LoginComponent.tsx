'use client';

import {
	Button,
	Center,
	Container,
	Field,
	Flex,
	Heading,
	Input,
	Link,
	Stack
} from '@chakra-ui/react';
import { FieldProps, Form, Formik, Field as FormikField } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { object, string } from 'yup';

import { TrackClickEvent } from '@/components';
import { toaster } from '@/components/ui/toaster';
import { createClient } from '@/lib/supabase/client';

export default function LoginComponent() {
	const supabase = createClient();
	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<Container maxW="lg" mt={['32', '36']}>
			<Center>
				<Heading size="4xl" mb="8">
					Anmeldung
				</Heading>
			</Center>
			<Stack
				gap="6"
				py={['0', '8']}
				px={['4', '10']}
				bg={['transparent', 'white']}
				boxShadow={['none', 'sm']}
				borderRadius={['none', 'xl']}>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={object({
						email: string()
							.email('Invalide Email Addresse.')
							.required('Email Addresse wird benötigt.'),
						password: string().required('Passwort wird benötigt.')
					})}
					onSubmit={async ({ email, password }) => {
						setIsSubmitting(true);

						const { error } = await supabase.auth.signInWithPassword({
							email,
							password
						});

						if (error) {
							toaster.create({
								title: 'Anmeldung fehlgeschlagen.',
								description: 'Wir konnten die Anmeldung nicht durchführen.',
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
								<FormikField name="email">
									{({ field, form }: FieldProps) => (
										<Field.Root
											required
											invalid={(form.errors.email && form.touched.email) as boolean}>
											<Field.Label>
												Email Addresse
												<Field.RequiredIndicator />
											</Field.Label>
											<Input autoComplete="email" {...field} />
											<Field.ErrorText>{form.errors?.email as string}</Field.ErrorText>
										</Field.Root>
									)}
								</FormikField>
								<FormikField name="password">
									{({ field, form }: FieldProps) => (
										<Field.Root
											required
											invalid={(form.errors.password && form.touched.password) as boolean}>
											<Flex justify="space-between" width="full">
												<Field.Label>
													Password
													<Field.RequiredIndicator />
												</Field.Label>
												<Link
													href="/reset-password"
													color="green.700"
													fontSize="sm"
													marginLeft="auto">
													Passwort vergessen
												</Link>
											</Flex>
											<Input type="password" autoComplete="current-password" {...field} />
											<Field.ErrorText>{form.errors?.password as string}</Field.ErrorText>
										</Field.Root>
									)}
								</FormikField>
							</Stack>
						</Form>
					)}
				</Formik>
				<TrackClickEvent event={{ name: 'ADMIN_LOGIN_BUTTON_CLICK' }}>
					<Button type="submit" form="login" colorPalette="green" loading={isSubmitting}>
						Einloggen
					</Button>
				</TrackClickEvent>
			</Stack>
		</Container>
	);
}
