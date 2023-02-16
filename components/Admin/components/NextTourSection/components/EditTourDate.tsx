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
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { Edit } from 'icons';
import { AdminTourListContext } from 'lib/contexts/AdminTourListContext';
import { useContext, useState } from 'react';
import { boolean, object, string } from 'yup';

const EDIT_FORM = 'editTourDate';

const EditTourDate = () => {
  const supabaseClient = useSupabaseClient();
  const { tourDate, load } = useContext(AdminTourListContext);
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submit = async ({
    tour_date,
    meeting_point,
    halfday_tour
  }: {
    tour_date: string;
    meeting_point: string;
    halfday_tour: boolean;
  }) => {
    setIsSubmitting(false);

    const date = new Date(
      `${tour_date.split(', ')[0].split('.').reverse().join('-')} ${
        tour_date.split(', ')[1]
      }`
    );

    const { error } = await supabaseClient
      .from('tour_dates')
      .update({ tour_date: date.toISOString(), meeting_point, halfday_tour })
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

    fetch('/api/revalidate', {
      method: 'POST',
      body: JSON.stringify({
        secret: process.env.REGENERATE_TOKEN,
        pages: []
      })
    });

    onClose();
    setIsSubmitting(false);
    load();
  };

  return (
    <>
      <Button leftIcon={<Edit boxSize="5" />} onClick={onOpen}>
        Ändern
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tourdaten ändern</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                tour_date: new Intl.DateTimeFormat('de-ch', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false
                }).format(new Date(tourDate.tour_date)),
                meeting_point: tourDate.meeting_point,
                halfday_tour: tourDate.halfday_tour
              }}
              validationSchema={object({
                tour_date: string()
                  .required('Datum wird benötigt.')
                  .matches(/^[0-9]{2}.[0-9]{2}.[0-9]{4}, [0-9]{2}:[0-9]{2}$/, {
                    message: 'Datum muss im Format "dd.mm.yyyy, hh:mm" sein.'
                  }),
                meeting_point: string().required('Treffpunkt wird benötigt'),
                halfday_tour: boolean()
              })}
              onSubmit={submit}>
              <Form id={EDIT_FORM}>
                <Stack spacing="5">
                  <Field name="tour_date">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          (form.errors.tour_date &&
                            form.touched.tour_date) as boolean
                        }>
                        <FormLabel>Tour Datum</FormLabel>
                        <Input placeholder="dd.mm.yyyy, hh:mm" {...field} />
                        <FormErrorMessage>
                          {form.errors?.tour_date as string}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="meeting_point">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          (form.errors.meeting_point &&
                            form.touched.meeting_point) as boolean
                        }>
                        <FormLabel>Treffpunkt</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors?.meeting_point as string}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="halfday_tour">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          (form.errors.halfday_tour &&
                            form.touched.halfday_tour) as boolean
                        }>
                        <Checkbox
                          colorScheme="green"
                          isChecked={field.value}
                          {...field}>
                          Halbtagestour
                        </Checkbox>
                        <FormErrorMessage>
                          {form.errors?.halfday_tour as string}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
              </Form>
            </Formik>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                disabled={isSubmitting}
                variant="outline"
                onClick={onClose}>
                Abbrechen
              </Button>
              <Button
                colorScheme="mapGreen"
                type="submit"
                form={EDIT_FORM}
                isLoading={isSubmitting}>
                Speichern
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTourDate;
