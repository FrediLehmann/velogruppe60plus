'use client';

import { Field, HStack, Input, Stack, Textarea } from '@chakra-ui/react';
import { FieldProps, Form, Formik, Field as FormikField } from 'formik';
import { number, object, string } from 'yup';

import { GpxUploadInput } from '@/components';
import UploadInput from '@/components/UploadInput';
import { TourFields } from '@/types/TourFields.types';

import { defaultValues } from './defaultValues';

export default function TourForm({
	initialValues = defaultValues,
	submit,
	formName
}: {
	initialValues?: TourFields;
	submit: (values: TourFields) => Promise<void>;
	formName: string;
}) {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={object({
				name: string().required('Name wird benötigt.'),
				description: string().required('Beschreibung wird benötigt.'),
				route: string().required('Route wird benötigt'),
				mapLink: string().url('Inkorrekt formatierte Url'),
				mapImage: string(),
				mapImageData: object({
					width: number(),
					height: number()
				}),
				gpxFile: string().nullable(),
				distance: string().required('Distanz wird benötigt'),
				ascent: string().required('Aufstieg wird benötigt'),
				descent: string().required('Abstieg wird benötigt'),
				duration: string().required('Dauer wird benötigt'),
				start: string().required('Start ort wird benötigt'),
				end: string().required('Zielpunkt wird benötigt'),
				pause: string().required('Pause wird benötigt')
			})}
			onSubmit={submit}>
			{() => (
				<Form id={formName}>
					<Stack gap="5">
						<FormikField name="name">
							{({ field, form }: FieldProps) => (
								<Field.Root required invalid={(form.errors.name && form.touched.name) as boolean}>
									<Field.Label>
										Name
										<Field.RequiredIndicator />
									</Field.Label>
									<Input {...field} />
									<Field.ErrorText>{form.errors?.name as string}</Field.ErrorText>
								</Field.Root>
							)}
						</FormikField>
						<FormikField name="description">
							{({ field, form }: FieldProps) => (
								<Field.Root
									required
									invalid={(form.errors.description && form.touched.description) as boolean}>
									<Field.Label>
										Beschreibung
										<Field.RequiredIndicator />
									</Field.Label>
									<Textarea {...field} background="white" />
									<Field.ErrorText>{form.errors?.description as string}</Field.ErrorText>
								</Field.Root>
							)}
						</FormikField>
						<FormikField name="route">
							{({ field, form }: FieldProps) => (
								<Field.Root required invalid={(form.errors.route && form.touched.route) as boolean}>
									<Field.Label>
										Route
										<Field.RequiredIndicator />
									</Field.Label>
									<Textarea {...field} background="white" />
									<Field.ErrorText>{form.errors?.route as string}</Field.ErrorText>
								</Field.Root>
							)}
						</FormikField>
						<FormikField name="mapLink">
							{({ field, form }: FieldProps) => (
								<Field.Root invalid={(form.errors.mapLink && form.touched.mapLink) as boolean}>
									<Field.Label>Url zur Schweiz Mobil Karte</Field.Label>
									<Input {...field} />
									<Field.ErrorText>{form.errors?.mapLink as string}</Field.ErrorText>
								</Field.Root>
							)}
						</FormikField>
						<FormikField name="mapImage">
							{(fieldProps: FieldProps) => (
								<UploadInput
									label="Bild der Karte"
									buttonLabel="Bild hochladen..."
									acceptedFileTypes="image/png, image/jpeg"
									fieldProps={fieldProps}
								/>
							)}
						</FormikField>
						<FormikField name="gpxFile">
							{(fieldProps: FieldProps) => (
								<GpxUploadInput
									label="GPX Datei"
									buttonLabel="GPX hochladen..."
									fieldProps={fieldProps}
								/>
							)}
						</FormikField>
						<HStack gap="4">
							<FormikField name="start">
								{({ field, form }: FieldProps) => (
									<Field.Root
										required
										invalid={(form.errors.start && form.touched.start) as boolean}>
										<Field.Label>
											Startpunk
											<Field.RequiredIndicator />
										</Field.Label>
										<Textarea {...field} />
										<Field.ErrorText>{form.errors?.start as string}</Field.ErrorText>
									</Field.Root>
								)}
							</FormikField>
							<FormikField name="end">
								{({ field, form }: FieldProps) => (
									<Field.Root required invalid={(form.errors.end && form.touched.end) as boolean}>
										<Field.Label>
											Endpunkt
											<Field.RequiredIndicator />
										</Field.Label>
										<Textarea {...field} />
										<Field.ErrorText>{form.errors?.end as string}</Field.ErrorText>
									</Field.Root>
								)}
							</FormikField>
						</HStack>
						<FormikField name="pause">
							{({ field, form }: FieldProps) => (
								<Field.Root required invalid={(form.errors.pause && form.touched.pause) as boolean}>
									<Field.Label>
										Pausenort
										<Field.RequiredIndicator />
									</Field.Label>
									<Textarea {...field} background="white" />
									<Field.ErrorText>{form.errors?.pause as string}</Field.ErrorText>
								</Field.Root>
							)}
						</FormikField>
						<HStack gap="4">
							<FormikField name="distance">
								{({ field, form }: FieldProps) => (
									<Field.Root
										required
										invalid={(form.errors.distance && form.touched.distance) as boolean}>
										<Field.Label>
											Distanz
											<Field.RequiredIndicator />
										</Field.Label>
										<Input {...field} />
										<Field.ErrorText>{form.errors?.distance as string}</Field.ErrorText>
									</Field.Root>
								)}
							</FormikField>
							<FormikField name="duration">
								{({ field, form }: FieldProps) => (
									<Field.Root
										required
										invalid={(form.errors.duration && form.touched.duration) as boolean}>
										<Field.Label>
											Dauer
											<Field.RequiredIndicator />
										</Field.Label>
										<Input {...field} />
										<Field.ErrorText>{form.errors?.duration as string}</Field.ErrorText>
									</Field.Root>
								)}
							</FormikField>
						</HStack>
						<HStack gap="4">
							<FormikField name="ascent">
								{({ field, form }: FieldProps) => (
									<Field.Root
										required
										invalid={(form.errors.ascent && form.touched.ascent) as boolean}>
										<Field.Label>
											Aufstieg
											<Field.RequiredIndicator />
										</Field.Label>
										<Input {...field} />
										<Field.ErrorText>{form.errors?.ascent as string}</Field.ErrorText>
									</Field.Root>
								)}
							</FormikField>
							<FormikField name="descent">
								{({ field, form }: FieldProps) => (
									<Field.Root
										required
										invalid={(form.errors.descent && form.touched.descent) as boolean}>
										<Field.Label>Abstieg</Field.Label>
										<Input {...field} />
										<Field.ErrorText>{form.errors?.descent as string}</Field.ErrorText>
									</Field.Root>
								)}
							</FormikField>
						</HStack>
					</Stack>
				</Form>
			)}
		</Formik>
	);
}
