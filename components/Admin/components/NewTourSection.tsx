import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Field, FieldProps, Form, Formik } from "formik";
import { Plus } from "icons";
import { object, string } from "yup";

const NewTourSection = () => {
  const toast = useToast();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blue"
        rightIcon={<Plus boxSize="5" />}
        onClick={onOpen}
      >
        Neue Tour erfassen
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Tour erfassen</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                description: "",
                mapLink: "",
                distance: "",
                ascent: "",
                descent: "",
                duration: "",
                start: "",
                end: "",
                pause: "",
              }}
              validationSchema={object({
                name: string().required("Name wird benötigt."),
                description: string().required("Beschreibung wird benötigt."),
                mapLink: string()
                  .url("Inkorrekt formatierte Url")
                  .required("Url wird benötigt"),
                distance: string().required("Distanz wird benötigt"),
                ascent: string().required("Aufstieg wird benötigt"),
                descent: string().required("Abstieg wird benötigt"),
                duration: string().required("Dauer wird benötigt"),
                start: string().required("Start ort wird benötigt"),
                end: string().required("Zielpunkt wird benötigt"),
                pause: string().required("Pause wird benötigt"),
              })}
              onSubmit={async ({
                name,
                description,
                mapLink,
                start,
                end,
                pause,
                distance,
                ascent,
                descent,
                duration,
              }) => {
                const { error } = await supabaseClient.from("touren").insert([
                  {
                    name,
                    description,
                    mapUrl: mapLink,
                    startPoint: start,
                    endPoint: end,
                    pause,
                    distance,
                    ascent,
                    descent,
                    duration,
                  },
                ]);

                if (error) {
                  toast({
                    title: "Speichern fehlgeschlagen.",
                    description: "Tour konnte nicht gespeichert werden.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top",
                  });
                  return;
                }

                toast({
                  title: "Tour gespeichert.",
                  description: "Ihre Tour wurde gespeichert.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top",
                });
                onClose();
              }}
            >
              {(props) => (
                <Form id="createTour">
                  <Stack spacing="5">
                    <Field name="name">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={
                            (form.errors.name && form.touched.name) as boolean
                          }
                        >
                          <FormLabel>Name</FormLabel>
                          <Input {...field} background="white" />
                          <FormErrorMessage>
                            {form.errors?.name as string}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="description">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={
                            (form.errors.description &&
                              form.touched.description) as boolean
                          }
                        >
                          <FormLabel>Beschreibung</FormLabel>
                          <Textarea {...field} background="white" />
                          <FormErrorMessage>
                            {form.errors?.description as string}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="mapLink">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={
                            (form.errors.mapLink &&
                              form.touched.mapLink) as boolean
                          }
                        >
                          <FormLabel>Url zur Schweiz Mobil Karte</FormLabel>
                          <Input {...field} background="white" />
                          <FormErrorMessage>
                            {form.errors?.mapLink as string}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <HStack spacing="4">
                      <Field name="start">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              (form.errors.start &&
                                form.touched.start) as boolean
                            }
                          >
                            <FormLabel>Startpunk</FormLabel>
                            <Input {...field} background="white" />
                            <FormErrorMessage>
                              {form.errors?.start as string}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="end">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              (form.errors.end && form.touched.end) as boolean
                            }
                          >
                            <FormLabel>Endpunkt</FormLabel>
                            <Input {...field} background="white" />
                            <FormErrorMessage>
                              {form.errors?.end as string}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <Field name="pause">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={
                            (form.errors.pause && form.touched.pause) as boolean
                          }
                        >
                          <FormLabel>Pausenort</FormLabel>
                          <Textarea {...field} background="white" />
                          <FormErrorMessage>
                            {form.errors?.pause as string}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <HStack spacing="4">
                      <Field name="distance">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              (form.errors.distance &&
                                form.touched.distance) as boolean
                            }
                          >
                            <FormLabel>Distanz</FormLabel>
                            <Input {...field} background="white" />
                            <FormErrorMessage>
                              {form.errors?.distance as string}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="duration">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              (form.errors.duration &&
                                form.touched.duration) as boolean
                            }
                          >
                            <FormLabel>Dauer</FormLabel>
                            <Input {...field} background="white" />
                            <FormErrorMessage>
                              {form.errors?.duration as string}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack spacing="4">
                      <Field name="ascent">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              (form.errors.ascent &&
                                form.touched.ascent) as boolean
                            }
                          >
                            <FormLabel>Aufstieg</FormLabel>
                            <Input {...field} background="white" />
                            <FormErrorMessage>
                              {form.errors?.ascent as string}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="descent">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              (form.errors.descent &&
                                form.touched.descent) as boolean
                            }
                          >
                            <FormLabel>Abstieg</FormLabel>
                            <Input {...field} background="white" />
                            <FormErrorMessage>
                              {form.errors?.descent as string}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Abbrechen
              </Button>
              <Button colorScheme="blue" type="submit" form="createTour">
                Speichern
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Divider borderColor="gray.500" my="3" />
    </>
  );
};

export default NewTourSection;
