'use client'

import { fetchJson } from '@/utils/fetch-utils'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { FormikSubmit } from '@/types/formik'
import CatalogForm, {
  CatalogFormFields,
} from '@/components/catalog/CatalogForm'

interface Payload {
  name: string
  price: number
}

export default function CatalogCreateForm() {
  const router = useRouter()

  const handleSubmit: FormikSubmit<CatalogFormFields> = async (
    values,
    actions
  ) => {
    try {
      await fetchJson('/api/catalog/product', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          // TODO make a util to do this automatically
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      // TODO implement feature where you can toggle going back to the catalog
      router.push('/catalog')
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
