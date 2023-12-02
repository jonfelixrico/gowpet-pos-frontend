'use client'

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
import BarcodeInput from './BarcodeInput'

export interface CatalogFormFields {
  name: string
  price: number
}
export type CatalogFormSubmitFn = (value: CatalogFormFields) => Promise<void>

export default function CatalogForm({
  onSubmit,
  initialValues = {
    name: '',
    price: 0,
  },
}: {
  onSubmit: CatalogFormSubmitFn
  initialValues?: CatalogFormFields
}) {
  const handleSubmit: FormikSubmit<CatalogFormFields> = async (
    values,
    actions
  ) => {
    try {
      await onSubmit(values)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form data-cy="form">
          <Flex direction="column" alignItems="stretch" gap={2}>
            <Field name="name">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.name && !!form.touched.name}
                  data-cy="name"
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
                  data-cy="price"
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

            <BarcodeInput />

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
