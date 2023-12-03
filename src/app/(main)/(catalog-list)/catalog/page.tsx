import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogItemTable from './CatalogItemTable'
import { Center, Divider, Flex } from '@chakra-ui/react'
import { CatalogPaginationControls } from './CatalogPaginationControls'
import { notFound, redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Catalog({
  searchParams,
}: {
  searchParams: {
    pageNo?: string
    searchTerm?: string
  }
}) {
  const { searchTerm } = searchParams
  const qp = new URLSearchParams()
  if (searchTerm) {
    qp.set('searchTerm', searchTerm)
  }

  const pageNo = searchParams.pageNo ? parseInt(searchParams.pageNo) : 1
  qp.set('pageNo', String(pageNo - 1))

  const { data, headers } = await apiFetchData<CatalogItem[]>(
    `/catalog?${qp.toString()}`
  )

  if (!data?.length) {
    notFound()
  }

  const pageCount = parseInt(headers.get('X-Total-Count') ?? '1')
  return (
    <Flex direction="column" height="full" width="full" gap={2}>
      <CatalogPaginationControls
        pageCount={pageCount}
        pageNo={pageNo}
        additionalQuery={searchParams}
      />

      <Divider />

      <CatalogItemTable items={data} data-cy="table" flex={1} />

      <CatalogPaginationControls
        pageCount={pageCount}
        pageNo={pageNo}
        additionalQuery={searchParams}
      />
    </Flex>
  )
}
