import { FormikHelpers } from 'formik'

export type FormikSubmit<T> = (
  values: T,
  actions: FormikHelpers<T>
) => void | Promise<void>
