'use client'

import { Credentials } from '@/types/login-types'
import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik'

export default function LoginForm({
  onSubmit,
}: {
  onSubmit: (credentials: Credentials) => Promise<void>
}) {
  async function handleSubmit(
    values: Credentials,
    actions: FormikHelpers<Credentials>
  ) {
    try {
      await onSubmit(values)
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
                  <Input
                    {...field}
                    type="text"
                    autoComplete="username"
                    data-cy="username"
                  />
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.password && !!form.touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="current-password"
                    data-cy="password"
                  />
                </FormControl>
              )}
            </Field>

            <Button
              isLoading={props.isSubmitting}
              type="submit"
              data-cy="submit"
              colorScheme="blue"
            >
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
