import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogEditForm from './CatalogEditForm'
import { Card, CardBody, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import BackIconButton from '../../../../../components/catalog/BackIconButton'
import { CatalogFormFields } from '@/components/catalog/CatalogForm'
import { redirect } from 'next/navigation'

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
    <Flex height="full" gap={5} direction="column">
      <Flex align="center" gap={5}>
        <Link href={`/catalog/${params.catalogId}`}>
          <BackIconButton />
        </Link>

        <Heading>Edit Item</Heading>
      </Flex>

      <Card>
        <CardBody>
          <CatalogEditForm
            id={data.id}
            initialValues={data}
            onSubmit={uploadChanges}
          />
        </CardBody>
      </Card>
    </Flex>
  )
}
