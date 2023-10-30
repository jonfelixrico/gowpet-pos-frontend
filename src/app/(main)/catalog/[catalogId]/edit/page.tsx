import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogEditForm from './CatalogEditForm'
import { Card, CardBody, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import BackIconButton from '../../BackIconButton'

interface Params {
  catalogId: string
}

export const dynamic = 'force-dynamic'

export default async function CatalogEdit({ params }: { params: Params }) {
  const { data } = await apiFetchData<CatalogItem>(
    `/catalog/product/${params.catalogId}`
  )

  return (
    <Flex height="full" gap={5} direction="column">
      <Flex align="center" gap={5}>
        <Link href={`/catalog/${params.catalogId}`} prefetch={false}>
          <BackIconButton />
        </Link>

        <Heading>Edit Item</Heading>
      </Flex>

      <Card>
        <CardBody>
          <CatalogEditForm id={data.id} initialValues={data} />
        </CardBody>
      </Card>
    </Flex>
  )
}
