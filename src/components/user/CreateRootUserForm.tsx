'use client'

import { Credentials } from '@/types/login-types'
import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik'
import * as Yup from 'yup'

interface ConfirmCredentials extends Credentials {
  confirmPassword: string
}

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')]),
})

export default function CreateRootUserForm({
  onSubmit,
}: {
  onSubmit: (credentials: Credentials) => Promise<void>
}) {
  async function handleSubmit(
    values: ConfirmCredentials,
    actions: FormikHelpers<ConfirmCredentials>
  ) {
    try {
      await onSubmit(values)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={
        {
          username: '',
          password: '',
          confirmPassword: '',
        } as ConfirmCredentials
      }
      onSubmit={handleSubmit}
      validationSchema={ValidationSchema}
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

            <Field name="confirmPassword">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    !!form.errors.confirmPassword &&
                    !!form.touched.confirmPassword
                  }
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input {...field} type="password" />
                </FormControl>
              )}
            </Field>

            <Button
              isLoading={props.isSubmitting}
              type="submit"
              data-cy="submit"
              colorScheme="blue"
            >
              Create User
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
