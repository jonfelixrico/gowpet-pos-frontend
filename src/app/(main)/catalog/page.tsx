import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { Button, Divider, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import CatalogContent from './CatalogContent'

export const dynamic = 'force-dynamic'

export default async function Catalog() {
  const { data } = await apiFetchData<CatalogItem[]>('/catalog')
  return (
    <Flex direction="column" gap="2" as="main" height="100%">
      <Flex justify="end">
        <Link href="/catalog/create">
          <Button colorScheme="blue" data-cy="create">
            Create
          </Button>
        </Link>
      </Flex>

      <Divider />

      <CatalogContent items={data} flex={1} />
    </Flex>
  )
}
