import { Card, CardBody } from '@chakra-ui/react'
import CatalogCreateForm from './CatalogCreateForm'
import { CatalogFormFields } from '@/components/catalog/CatalogForm'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { redirect } from 'next/navigation'
import DetailsLayoutWithTitle from '@/components/common/DetailsLayoutWithTitle'

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
    <DetailsLayoutWithTitle
      height="full"
      width="full"
      href="/catalog"
      title="Create Item"
    >
      <Card>
        <CardBody>
          <CatalogCreateForm onSubmit={create} />
        </CardBody>
      </Card>
    </DetailsLayoutWithTitle>
  )
}
