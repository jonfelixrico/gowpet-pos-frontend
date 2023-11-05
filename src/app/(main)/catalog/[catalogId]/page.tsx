import { CatalogItem } from '@/types/CatalogItem'
import { apiFetch, apiFetchData } from '@/server-utils/resource-api-util'
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react'
import BackIconButton from '@/components/catalog/BackIconButton'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import CatalogDeleteButton from './CatalogDeleteButton'
import { FetchError } from '@/utils/fetch-utils'

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
    <Flex height="full" gap={5} direction="column">
      <Flex align="center" gap={5}>
        <Link href="/catalog" data-cy="back">
          <BackIconButton />
        </Link>
        <Heading>Item Details</Heading>

        <Spacer />

        <Link href={`/catalog/${params.catalogId}/edit`}>
          <Button colorScheme="blue" data-cy="edit">
            Edit
          </Button>
        </Link>

        <CatalogDeleteButton onDelete={submitDelete} />
      </Flex>
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
    </Flex>
  )
}
