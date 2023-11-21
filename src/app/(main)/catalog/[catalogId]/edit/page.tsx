import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogEditForm from './CatalogEditForm'
import { Card, CardBody } from '@chakra-ui/react'
import { CatalogFormFields } from '@/components/catalog/CatalogForm'
import { redirect } from 'next/navigation'
import DetailsLayoutWithTitle from '@/components/common/DetailsLayoutWithTitle'

interface Params {
  catalogId: string
}

export const dynamic = 'force-dynamic'

export default async function CatalogEdit({ params }: { params: Params }) {
  const url = `/catalog/product/${params.catalogId}`

  const { data } = await apiFetchData<CatalogItem>(url)

  async function uploadChanges(value: CatalogFormFields) {
    'use server'

    await apiFetchData(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })

    redirect(`/catalog/${params.catalogId}`)
  }

  return (
    <DetailsLayoutWithTitle
      href={`/catalog/${params.catalogId}`}
      title="Edit Item"
    >
      <Card>
        <CardBody>
          <CatalogEditForm
            id={data.id}
            initialValues={data}
            onSubmit={uploadChanges}
          />
        </CardBody>
      </Card>
    </DetailsLayoutWithTitle>
  )
}
