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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { object, string } from 'yup';

import { TrackClickEvent } from '@/components';
import { createClient } from '@/lib/supabase/client';

export default function LoginComponent() {
	const supabase = createClient();
	const router = useRouter();

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

						router.push('/admin');
					}}>
					{() => (
						<Form id="login">
							<Stack spacing="5">
								<Field name="email">
									{({ field, form }: FieldProps) => (
										<FormControl
											isRequired
											isInvalid={(form.errors.email && form.touched.email) as boolean}>
											<FormLabel>Email Addresse</FormLabel>
											<Input autoComplete="email" {...field} />
											<FormErrorMessage>{form.errors?.email as string}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Field name="password">
									{({ field, form }: FieldProps) => (
										<FormControl
											isRequired
											isInvalid={(form.errors.password && form.touched.password) as boolean}>
											<Flex justify="space-between">
												<FormLabel>Password</FormLabel>
												<Link href="/reset-password" color="green.700" fontSize="sm">
													Passwort vergessen
												</Link>
											</Flex>
											<Input type="password" autoComplete="current-password" {...field} />
											<FormErrorMessage>{form.errors?.password as string}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</Stack>
						</Form>
					)}
				</Formik>
				<TrackClickEvent event={{ name: 'ADMIN_LOGIN_BUTTON_CLICK' }}>
					<Button type="submit" form="login" colorScheme="mapGreen" isLoading={isSubmitting}>
						Einloggen
					</Button>
				</TrackClickEvent>
			</Stack>
		</Container>
	);
}
