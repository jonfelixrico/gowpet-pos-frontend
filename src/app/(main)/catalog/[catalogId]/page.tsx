import { CatalogItem } from '@/types/CatalogItem'
import { apiFetch, apiFetchData } from '@/server-utils/resource-api-util'
import { Button, Card, CardBody, Flex, Heading, Spacer } from '@chakra-ui/react'
import BackIconButton from '../BackIconButton'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import CatalogDeleteButton from './CatalogDeleteButton'

interface Params {
  catalogId: string
}

export const dynamic = 'force-dynamic'

export default async function CatalogDetails({ params }: { params: Params }) {
  const url = `/catalog/product/${params.catalogId}`

  const { data } = await apiFetchData<CatalogItem>(url)

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
        <Link href="/catalog">
          <BackIconButton />
        </Link>
        <Heading>Item Details</Heading>

        <Spacer />

        <Link href={`/catalog/${params.catalogId}/edit`}>
          <Button colorScheme="blue">Edit</Button>
        </Link>

        <CatalogDeleteButton onDelete={submitDelete} />
      </Flex>
      <Card>
        <CardBody>
          <Flex direction="column" gap={2}>
            <Flex gap={2}>
              <Heading size="sx">Name:</Heading>
              {data.name}
            </Flex>

            <Flex gap={2}>
              <Heading size="sx">Price:</Heading>
              {data.price}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  )
}
