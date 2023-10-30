'use client'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FormikSubmit } from '@/types/formik'
import CatalogForm, {
  CatalogFormFields,
} from '@/components/catalog/CatalogForm'

export default function CatalogCreateForm(props: {
  onSubmit: (values: CatalogFormFields) => Promise<void>
}) {
  const handleSubmit: FormikSubmit<CatalogFormFields> = async (
    values,
    actions
  ) => {
    try {
      await props.onSubmit(values)
    } catch (e) {
      // TODO improve error handling
      alert(`Error! ${e}`)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <CatalogForm handleSubmit={handleSubmit}>
      <Button type="submit">Create</Button>
    </CatalogForm>
  )
}
