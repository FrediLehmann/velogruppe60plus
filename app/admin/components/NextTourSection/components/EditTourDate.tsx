import {
	Button,
	ButtonGroup,
	Checkbox,
	Dialog,
	Field,
	Input,
	Stack,
	useDisclosure
} from '@chakra-ui/react';
import { FieldProps, Form, Formik, Field as FormikField } from 'formik';
import { useContext, useMemo, useState } from 'react';
import { boolean, object, string } from 'yup';

import revalidatePaths from '@/app/admin/actions/revalidate';
import { TrackClickEvent } from '@/components';
import { toaster } from '@/components/ui/toaster';
import { Edit } from '@/icons';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';

const EDIT_FORM = 'editTourDate';

export default function EditTourDate() {
	const supabaseClient = createClient();
	const { tourDate, load } = useContext(AdminTourListContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { open, onOpen, onClose } = useDisclosure();

	const dateString = useMemo(() => {
		const date = new Date(tourDate.tour_date || '');
		return `${date.getFullYear()}-${
			date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
		}-${date.getDate()}T${date.getHours()}:${
			date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
		}`;
	}, [tourDate.tour_date]);

	const submit = async ({
		tour_date,
		halfday_tour
	}: {
		tour_date: string;
		halfday_tour: boolean;
	}) => {
		setIsSubmitting(false);

		const { error } = await supabaseClient
			.from('tour_dates')
			.update({ tour_date: new Date(tour_date).toISOString(), halfday_tour })
			.eq('id', tourDate.id);

		if (error)
			toaster.create({
				title: 'Speichern fehlgeschlagen.',
				description: 'Tourdaten konnte nicht gespeichert werden.',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top'
			});

		await revalidatePaths(['/', `/tour/${tourDate.id}`]);

		onClose();
		setIsSubmitting(false);
		load();
	};

	return (
		<>
			<TrackClickEvent event={{ name: 'EDIT_TOUR_DATE_BUTTON_CLICK' }} showBox={true}>
				<Button onClick={onOpen}>
					<Edit boxSize="5" />
					Ändern
				</Button>
			</TrackClickEvent>
			<Dialog.Root open={open} onClose={onClose}>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger />
						<Dialog.Header>
							<Dialog.Title>Tourdaten ändern</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Formik
								initialValues={{
									tour_date: dateString,
									halfday_tour: tourDate.halfday_tour
								}}
								validationSchema={object({
									tour_date: string().required('Datum wird benötigt.'),
									halfday_tour: boolean()
								})}
								onSubmit={submit}>
								<Form id={EDIT_FORM}>
									<Stack gap="5">
										<FormikField name="tour_date">
											{({ field, form }: FieldProps) => (
												<Field.Root
													isRequired
													isInvalid={(form.errors.tour_date && form.touched.tour_date) as boolean}>
													<Field.Label>
														Tour Datum
														<Field.RequiredIndicator />
													</Field.Label>
													<Input type="datetime-local" {...field} />
													<Field.ErrorText>{form.errors?.tour_date as string}</Field.ErrorText>
												</Field.Root>
											)}
										</FormikField>
										<FormikField name="halfday_tour">
											{({ field, form }: FieldProps) => (
												<Field.Root
													isInvalid={
														(form.errors.halfday_tour && form.touched.halfday_tour) as boolean
													}>
													<Checkbox colorScheme="green" isChecked={field.value} {...field}>
														Halbtagestour
													</Checkbox>
													<Field.ErrorText>{form.errors?.halfday_tour as string}</Field.ErrorText>
												</Field.Root>
											)}
										</FormikField>
									</Stack>
								</Form>
							</Formik>
						</Dialog.Body>
						<Dialog.Footer>
							<ButtonGroup>
								<TrackClickEvent
									event={{ name: 'CANCEL_EDIT_TOUR_DATE_BUTTON_CLICK' }}
									showBox={true}>
									<Button disabled={isSubmitting} variant="outline" onClick={onClose}>
										Abbrechen
									</Button>
								</TrackClickEvent>
								<TrackClickEvent
									event={{ name: 'SAVE_EDIT_TOUR_DATE_BUTTON_CLICK' }}
									showBox={true}>
									<Button
										colorScheme="mapGreen"
										type="submit"
										form={EDIT_FORM}
										isLoading={isSubmitting}>
										Speichern
									</Button>
								</TrackClickEvent>
							</ButtonGroup>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}
