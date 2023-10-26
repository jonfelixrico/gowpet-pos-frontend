'use client'

import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form, Field, FieldProps } from 'formik'

function FieldTemplate ({
  fieldName,
  label
}: {
  fieldName: string,
  label: string
}) {
  return <Field name={fieldName}>
    {({ field, form }: FieldProps) => (
      <FormControl isInvalid={!!form.errors[fieldName] && !!form.touched[fieldName]}>
        <FormLabel>{label} </FormLabel>
        <Input {...field} />
      </FormControl>
    )}
  </Field>
}

export default function LoginForm() {
  return (<Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    }}
  >
    {(props) => (
      <Form>
        <Flex direction="column" alignItems="stretch" gap="2">
          <FieldTemplate fieldName="username" label="Username" />
          <FieldTemplate fieldName="password" label="Password" />

          <Button
            isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </Flex>
      </Form>
    )}
  </Formik>)
}