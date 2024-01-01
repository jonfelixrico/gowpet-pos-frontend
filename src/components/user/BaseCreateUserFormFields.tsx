'use client'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

export default function BaseCreateUserFormFields() {
  return (
    <>
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
            <FormErrorMessage>{String(form.errors.username)}</FormErrorMessage>
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

            <FormErrorMessage>{String(form.errors.password)}</FormErrorMessage>
          </FormControl>
        )}
      </Field>

      <Field name="confirmPassword">
        {({ field, form }: FieldProps) => (
          <FormControl
            isInvalid={
              !!form.errors.confirmPassword && !!form.touched.confirmPassword
            }
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input {...field} type="password" data-cy="confirm-password" />

            <FormErrorMessage>
              {String(form.errors.confirmPassword)}
            </FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  )
}
