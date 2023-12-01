import { Card, CardBody } from '@chakra-ui/react'
import { CatalogFormFields } from '@/components/catalog/CatalogForm'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { redirect } from 'next/navigation'
import DetailsLayoutWithTitle from '@/components/common/DetailsLayoutWithTitle'
import CatalogForm from '@/components/catalog/CatalogFormV2'

export default function CatalogCreate() {
  async function create(values: CatalogFormFields) {
    'use server'

    await apiFetchData('/catalog/product', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // TODO implement feature where you can toggle going back to the catalog
    redirect('/catalog')
  }

  return (
    <DetailsLayoutWithTitle href="/catalog" title="Create Item">
      <Card>
        <CardBody>
          <CatalogForm onSubmit={create} />
        </CardBody>
      </Card>
    </DetailsLayoutWithTitle>
  )
}
