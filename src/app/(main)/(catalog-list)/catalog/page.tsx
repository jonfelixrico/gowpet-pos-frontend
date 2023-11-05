import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogItemTable from './CatalogItemTable'
import { Center } from '@chakra-ui/react'
import { CatalogPaginationControls } from './CatalogPaginationControls'

export const dynamic = 'force-dynamic'

export default async function Catalog({
  searchParams,
}: {
  searchParams: {
    pageNo?: string
    itemCount?: string
    searchTerm?: string
  }
}) {
  const { data, headers } = await apiFetchData<CatalogItem[]>('/catalog')
  const pageCount = parseInt(headers.get('X-Total-Count') ?? '1')

  if (!data?.length) {
    return (
      <Center width="full" height="full" data-cy="empty">
        No items
      </Center>
    )
  }

  return (
    <CatalogItemTable
      items={data}
      height="full"
      width="full"
      data-cy="table"
      footer={
        <CatalogPaginationControls
          pageCount={pageCount}
          pageNo={parseInt(searchParams.pageNo ?? '0')}
          additionalQuery={searchParams}
        />
      }
    />
  )
}
