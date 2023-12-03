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
  Select,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import CatalogUpcInput from './CatalogUpcInput'
import { Else, If, Then } from 'react-if'

export interface CatalogFormFields {
  name: string
  price: number
  code?: string
}
export type CatalogFormSubmitFn = (value: CatalogFormFields) => Promise<void>

export default function CatalogForm({
  onSubmit,
  initialValues = {
    name: '',
    price: 0,
    code: 'UPC',
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

            <Flex gap={2} align="end">
              <Field name="code">
                {({ field, form }: FieldProps) => (
                  <If condition={form.values['codeType'] === 'UPC'}>
                    <Then>
                      <FormControl data-cy="code" flex={1}>
                        <FormLabel>Barcode (UPC)</FormLabel>
                        <CatalogUpcInput {...field} />
                      </FormControl>
                    </Then>

                    <Else>
                      <FormControl data-cy="code" flex={1}>
                        <FormLabel>Barcode (Customized)</FormLabel>
                        <Input
                          {...field}
                          placeContent="Type your custom barcode here"
                        />
                      </FormControl>
                    </Else>
                  </If>
                )}
              </Field>

              <Field name="codeType">
                {({ field, form }: FieldProps) => (
                  <FormControl data-cy="code-type" flex={0.5}>
                    <FormLabel>Barcode type</FormLabel>
                    <Select {...field}>
                      <option value="UPC">Scan Product (UPC)</option>
                      <option value="CUSTOM">Customized</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
            </Flex>

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
