'use client'

import CatalogForm, {
  CatalogFormFields,
} from '@/components/catalog/CatalogForm'
import { FormikSubmit } from '@/types/formik'
import { fetchJson } from '@/utils/fetch-utils'
import { Button } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie'

export default function CatalogEditForm({
  initialValues,
  id,
}: {
  initialValues: CatalogFormFields
  id: string
}) {
  const handleSubmit: FormikSubmit<CatalogFormFields> = async (
    values,
    actions
  ) => {
    try {
      await fetchJson('/api/catalog/product', {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          // TODO make a util to do this automatically
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      redirect(`catalog/${id}`)
    } catch (e) {
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
