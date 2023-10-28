'use client'

import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

function FieldTemplate({
  fieldName,
  label,
}: {
  fieldName: string
  label: string
}) {
  return (
    <Field name={fieldName}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={!!form.errors[fieldName] && !!form.touched[fieldName]}
        >
          <FormLabel>{label} </FormLabel>
          <Input {...field} />
        </FormControl>
      )}
    </Field>
  )
}

interface Payload {
  username: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()

  async function handleSubmit(
    values: Payload,
    actions: FormikHelpers<Payload>
  ) {
    try {
      // TODO do something about fetch
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      Cookies.set('token', await response.text())
      router.push('/home')
    } catch (e) {
      // TODO turn this into an actual chakra modal
      // TODO add logging
      alert(`Error while logging in: ${e}`)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <Flex direction="column" alignItems="stretch" gap="2">
            <FieldTemplate fieldName="username" label="Username" />
            <FieldTemplate fieldName="password" label="Password" />

            <Button isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
