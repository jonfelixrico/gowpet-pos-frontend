'use client'

import { FetchError, fetchWrapper } from '@/utils/fetch-utils'
import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { HTMLInputTypeAttribute } from 'react'

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
      const response = await fetchWrapper('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      Cookies.set('token', await response.text())
      router.push('/home')
    } catch (e) {
      // TODO turn these into actual modals

      if (e instanceof FetchError && e.is4XX) {
        alert('Wrong credentials')
        return
      }

      alert('Unexpected error')
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
            <Field name="username">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.username && !!form.touched.username}
                >
                  <FormLabel>Username</FormLabel>
                  <Input {...field} type="text" autoComplete="username" />
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.password && !!form.touched.password}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
              )}
            </Field>

            <Button isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
