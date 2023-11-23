'use client'

import { ReceiptSettings } from '@/types/ReceiptSetings'
import { FormikSubmit } from '@/types/formik'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'

export default function ReceiptSettingsForm({
  initialValues,
  onSubmit,
}: {
  onSubmit: (settings: ReceiptSettings) => Promise<void>
  initialValues: ReceiptSettings
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
          <Field name="header">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel>Header</FormLabel>
                <Input {...field} />
              </FormControl>
            )}
          </Field>

          <Field name="address">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input {...field} />
              </FormControl>
            )}
          </Field>

          <Field name="contactNo">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel>Contact Information</FormLabel>
                <Input {...field} />
              </FormControl>
            )}
          </Field>

          <Field name="snsLink">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel>Social Media URL</FormLabel>
                <Input {...field} />
              </FormControl>
            )}
          </Field>

          <Field name="snsMessage">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel>Social Media Message</FormLabel>
                <Input {...field} />
              </FormControl>
            )}
          </Field>

          <Button
            mt={4}
            colorScheme="blue"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Save Settings
          </Button>
        </Form>
      )}
    </Formik>
  )
}
