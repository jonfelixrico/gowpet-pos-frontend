'use client'

import { Credentials } from '@/types/login-types'

import { Formik, FormikHelpers, FormikProps } from 'formik'
import { ReactNode, useMemo } from 'react'
import * as Yup from 'yup'

interface ConfirmCredentials extends Credentials {
  confirmPassword: string
}

export default function CreateUserFormContainer({
  onSubmit,
  children,
}: {
  onSubmit: (credentials: Credentials) => Promise<void>
  children: (props: FormikProps<ConfirmCredentials>) => ReactNode
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
      {children}
    </Formik>
  )
}
