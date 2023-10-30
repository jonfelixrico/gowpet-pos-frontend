import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { Button, Card, CardBody, Flex, Heading, Spacer } from '@chakra-ui/react'
import BackIconButton from '../BackIconButton'
import Link from 'next/link'

interface Params {
  catalogId: string
}

const dynamic = 'force-dynamic'

export default async function CatalogDetails({ params }: { params: Params }) {
  const { data } = await apiFetchData<CatalogItem>(
    `/catalog/product/${params.catalogId}`
  )

  return (
    <Flex height="full" gap={5} direction="column">
      <Flex align="center" gap={5}>
        <Link href="/catalog">
          <BackIconButton />
        </Link>
        <Heading>Item Details</Heading>

        <Spacer />

        <Link href={`/catalog/${params.catalogId}/edit`}>
          <Button>Edit</Button>
        </Link>
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
