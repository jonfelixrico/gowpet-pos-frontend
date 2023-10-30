import { FormikSubmit } from '@/types/formik'
import {
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
import { ReactNode } from 'react'

interface Props {
  handleSubmit: FormikSubmit<CatalogFormFields>
  initialValues?: CatalogFormFields
  children?: ReactNode
}

export interface CatalogFormFields {
  name: string
  price: number
}

export default function CatalogForm({
  handleSubmit,
  children,
  initialValues = {
    name: '',
    price: 0,
  },
}: Props) {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form>
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

            {children}
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
