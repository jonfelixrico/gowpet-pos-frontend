import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogItemTable from './CatalogItemTable'
import { Center } from '@chakra-ui/react'

export const dynamic = 'force-dynamic'

export default async function Catalog() {
  const { data } = await apiFetchData<CatalogItem[]>('/catalog')

  if (!data?.length) {
    return (
      <Center width="full" height="full" data-cy="empty">
        No items
      </Center>
    )
  }

  return (
    <CatalogItemTable items={data} height="full" width="full" data-cy="table" />
  )
}
