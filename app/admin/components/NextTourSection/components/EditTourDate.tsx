import {
	Button,
	ButtonGroup,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure,
	useToast
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useContext, useMemo, useState } from 'react';
import { boolean, object, string } from 'yup';

import revalidatePaths from '@/app/admin/actions/revalidate';
import { TrackClickEvent } from '@/components';
import { Edit } from '@/icons';
import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';
import { createClient } from '@/lib/supabase/client';

const EDIT_FORM = 'editTourDate';

export default function EditTourDate() {
	const supabaseClient = createClient();
	const { tourDate, load } = useContext(AdminTourListContext);
	const toast = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

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
			toast({
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
				<Button leftIcon={<Edit boxSize="5" />} onClick={onOpen}>
					Ändern
				</Button>
			</TrackClickEvent>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Tourdaten ändern</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
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
								<Stack spacing="5">
									<Field name="tour_date">
										{({ field, form }: FieldProps) => (
											<FormControl
												isRequired
												isInvalid={(form.errors.tour_date && form.touched.tour_date) as boolean}>
												<FormLabel>Tour Datum</FormLabel>
												<Input type="datetime-local" {...field} />
												<FormErrorMessage>{form.errors?.tour_date as string}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="halfday_tour">
										{({ field, form }: FieldProps) => (
											<FormControl
												isInvalid={
													(form.errors.halfday_tour && form.touched.halfday_tour) as boolean
												}>
												<Checkbox colorScheme="green" isChecked={field.value} {...field}>
													Halbtagestour
												</Checkbox>
												<FormErrorMessage>{form.errors?.halfday_tour as string}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</Stack>
							</Form>
						</Formik>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup>
							<TrackClickEvent
								event={{ name: 'CANCEL_EDIT_TOUR_DATE_BUTTON_CLICK' }}
								showBox={true}>
								<Button disabled={isSubmitting} variant="outline" onClick={onClose}>
									Abbrechen
								</Button>
							</TrackClickEvent>
							<TrackClickEvent event={{ name: 'SAVE_EDIT_TOUR_DATE_BUTTON_CLICK' }} showBox={true}>
								<Button
									colorScheme="mapGreen"
									type="submit"
									form={EDIT_FORM}
									isLoading={isSubmitting}>
									Speichern
								</Button>
							</TrackClickEvent>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
