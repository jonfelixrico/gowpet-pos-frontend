'use client'

import CatalogForm, {
  CatalogFormFields,
} from '@/components/catalog/CatalogForm'
import { FormikSubmit } from '@/types/formik'
import { Button } from '@chakra-ui/react'

export default function CatalogEditForm({
  initialValues,
  onSubmit,
}: {
  initialValues: CatalogFormFields
  id: string
  onSubmit: (value: CatalogFormFields) => Promise<void>
}) {
  const handleSubmit: FormikSubmit<CatalogFormFields> = async (
    values,
    actions
  ) => {
    try {
      await onSubmit(values)
    } catch (e) {
      console.error('Error while saving', e)
      alert('Error while editing')
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <CatalogForm initialValues={initialValues} handleSubmit={handleSubmit}>
      <Button type="submit">Save Changes</Button>
    </CatalogForm>
  )
}
