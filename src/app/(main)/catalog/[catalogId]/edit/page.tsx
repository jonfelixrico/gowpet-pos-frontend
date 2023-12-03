import { CatalogItem } from '@/types/catalog/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { Card, CardBody } from '@chakra-ui/react'
import { notFound, redirect } from 'next/navigation'
import DetailsLayoutWithTitle from '@/components/common/DetailsLayoutWithTitle'
import CatalogForm from '@/components/catalog/CatalogForm'
import { FetchError } from '@/utils/fetch-utils'
import { CatalogFormFields } from '@/types/catalog/CatalogFormFields'

interface Params {
  catalogId: string
}

export const dynamic = 'force-dynamic'

export default async function CatalogEdit({ params }: { params: Params }) {
  const url = `/catalog/product/${params.catalogId}`

  let catalogItem: CatalogItem
  try {
    const { data } = await apiFetchData<CatalogItem>(url)
    catalogItem = data
  } catch (e) {
    if (e instanceof FetchError && e.response.status === 404) {
      notFound()
    }

    throw e
  }

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
          <CatalogForm onSubmit={uploadChanges} initialValues={catalogItem} />
        </CardBody>
      </Card>
    </DetailsLayoutWithTitle>
  )
}
