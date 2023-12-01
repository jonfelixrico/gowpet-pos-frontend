import { FormikSubmit } from '@/types/formik'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'

export interface CatalogFormFields {
  name: string
  price: number
}
export type CatalogFormSubmitFn = (value: CatalogFormFields) => Promise<void>

export default function CatalogForm({
  handleSubmit,
  initialValues = {
    name: '',
    price: 0,
  },
}: {
  handleSubmit: CatalogFormSubmitFn
  initialValues?: CatalogFormFields
}) {
  const onSubmit: FormikSubmit<CatalogFormFields> = async (values, actions) => {
    try {
      await handleSubmit(values)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <Form data-cy="form">
          <Flex direction="column" alignItems="stretch" gap={2}>
            <Field name="name">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.name && !!form.touched.name}
                >
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Type your product name here"
                    data-cy="name"
                  />
                </FormControl>
              )}
            </Field>

            <Field name="price">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.price && !!form.touched.price}
                >
                  <FormLabel>Unit Price</FormLabel>
                  <NumberInput
                    {...field}
                    min={0}
                    precision={2}
                    onChange={(val) => form.setFieldValue(field.name, val)}
                    data-cy="price"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              colorScheme="blue"
              data-cy="submit"
              isLoading={props.isSubmitting}
            >
              Save
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
