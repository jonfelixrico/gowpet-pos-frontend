'use client'

import { Credentials } from '@/types/login-types'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik'
import { useMemo } from 'react'
import * as Yup from 'yup'

interface ConfirmCredentials extends Credentials {
  confirmPassword: string
}

export default function CreateRootUserForm({
  onSubmit,
}: {
  onSubmit: (credentials: Credentials) => Promise<void>
}) {
  const ValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required().label('Username'),
        password: Yup.string().required().min(8).label('Password'),
        confirmPassword: Yup.string()
          .required()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .label('Confirm Password'),
      }),
    []
  )

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
                  <FormErrorMessage>
                    {String(form.errors.username)}
                  </FormErrorMessage>
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

                  <FormErrorMessage>
                    {String(form.errors.password)}
                  </FormErrorMessage>
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
                  <Input
                    {...field}
                    type="password"
                    data-cy="confirm-password"
                  />

                  <FormErrorMessage>
                    {String(form.errors.confirmPassword)}
                  </FormErrorMessage>
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
