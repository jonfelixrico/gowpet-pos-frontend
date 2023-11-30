'use client'

import { ReceiptSettings } from '@/types/ReceiptSetings'
import { FormikSubmit } from '@/types/formik'
import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'

export type OnSubmitFunction = (
  settings: ReceiptSettings
) => Promise<void> | void

export default function ReceiptSettingsForm({
  initialValues = {
    address: '',
    contactNo: '',
    header: '',
    snsLink: '',
    snsMessage: '',
  },
  onSubmit,
}: {
  onSubmit: OnSubmitFunction
  initialValues?: ReceiptSettings
}) {
  const handleSubmit: FormikSubmit<ReceiptSettings> = async (
    values,
    actions
  ) => {
    try {
      await onSubmit(values)
    } catch (e) {
      // TODO use modal for this
      alert('Error encountered while submitting')
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form>
          <Flex direction="column" gap={3}>
            <Field name="header">
              {({ field }: FieldProps) => (
                <FormControl data-cy="header">
                  <FormLabel>Header</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Field name="address">
              {({ field }: FieldProps) => (
                <FormControl data-cy="address">
                  <FormLabel>Address</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Field name="contactNo">
              {({ field }: FieldProps) => (
                <FormControl data-cy="contact-no">
                  <FormLabel>Contact information</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Field name="snsLink">
              {({ field }: FieldProps) => (
                <FormControl data-cy="sns-link">
                  <FormLabel>Social media URL</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Field name="snsMessage">
              {({ field }: FieldProps) => (
                <FormControl data-cy="sns-message">
                  <FormLabel>Social media message</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="blue"
              isLoading={props.isSubmitting}
              type="submit"
              data-cy="submit"
            >
              Save settings
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
