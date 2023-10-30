'use client'

import CatalogForm, {
  CatalogFormFields,
} from '@/components/catalog/CatalogForm'
import { FormikSubmit } from '@/types/formik'
import { fetchJson } from '@/utils/fetch-utils'
import { Button } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function CatalogEditForm({
  initialValues,
  id,
}: {
  initialValues: CatalogFormFields
  id: string
}) {
  const router = useRouter()

  const handleSubmit: FormikSubmit<CatalogFormFields> = async (
    values,
    actions
  ) => {
    try {
      await fetchJson(`/api/catalog/product/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          // TODO make a util to do this automatically
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      router.push(`/catalog/${id}`)
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
