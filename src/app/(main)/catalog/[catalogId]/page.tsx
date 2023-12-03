import { CatalogItem } from '@/types/catalog/CatalogItem'
import { apiFetch, apiFetchData } from '@/server-utils/resource-api-util'
import { Button, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import CatalogDeleteButton from './CatalogDeleteButton'
import { FetchError } from '@/utils/fetch-utils'
import DetailsLayoutWithTitle from '@/components/common/DetailsLayoutWithTitle'

interface Params {
  catalogId: string
}

export const dynamic = 'force-dynamic'

export default async function CatalogDetails({ params }: { params: Params }) {
  const url = `/catalog/product/${params.catalogId}`

  let data: CatalogItem | null = null
  try {
    const response = await apiFetchData<CatalogItem>(url)
    data = response.data
  } catch (e) {
    if (e instanceof FetchError && e.response.status === 404) {
      notFound()
    }

    throw e
  }

  async function submitDelete() {
    'use server'

    await apiFetch(url, {
      method: 'DELETE',
    })
    redirect('/catalog')
  }

  return (
    <DetailsLayoutWithTitle
      href="/catalog"
      title="Item Details"
      actions={
        <Flex gap={2}>
          <Link href={`/catalog/${params.catalogId}/edit`}>
            <Button colorScheme="blue" data-cy="edit">
              Edit
            </Button>
          </Link>

          <CatalogDeleteButton onDelete={submitDelete} />
        </Flex>
      }
    >
      <Card>
        <CardBody>
          <Flex direction="column" gap={2}>
            <Flex gap={2}>
              <Heading size="sx">Name:</Heading>
              <Text data-cy="name">{data.name}</Text>
            </Flex>

            <Flex gap={2}>
              <Heading size="sx" data-cy="price">
                Price:
              </Heading>
              <Text data-cy="price">{data.price}</Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </DetailsLayoutWithTitle>
  )
}
