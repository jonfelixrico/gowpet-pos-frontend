import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { Button, Card, CardBody, Flex, Heading, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import BackIconButton from '../../BackIconButton'

interface Params {
  catalogId: string
}

export default async function CatalogEdit({ params }: { params: Params }) {
  const { data } = await apiFetchData<CatalogItem>(
    `/catalog/product/${params.catalogId}`,
    {
      cache: 'no-cache',
    }
  )

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
