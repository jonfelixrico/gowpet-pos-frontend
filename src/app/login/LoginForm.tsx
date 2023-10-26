'use client'

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form, Field, FieldProps } from 'formik'

export default function LoginForm() {
  return (<Formik
    initialValues={{ name: 'Sasuke' }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    }}
  >
    {(props) => (
      <Form>
        <Field name='name'>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
              <FormLabel>First name</FormLabel>
              <Input {...field} placeholder='name' />
            </FormControl>
          )}
        </Field>
        <Button
          mt={4}
          colorScheme='teal'
          isLoading={props.isSubmitting}
          type='submit'
        >
          Submit
        </Button>
      </Form>
    )}
  </Formik>)
}