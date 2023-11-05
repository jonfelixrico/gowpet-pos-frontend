import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogItemTable from './CatalogItemTable'
import { Box, Card, CardBody, Center, Flex } from '@chakra-ui/react'
import { CatalogPaginationControls } from './CatalogPaginationControls'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Catalog({
  searchParams,
}: {
  searchParams: {
    pageNo?: string
    searchTerm?: string
  }
}) {
  const { pageNo, searchTerm } = searchParams
  if (!pageNo) {
    redirect('/catalog?pageNo=1')
  }

  const qp = new URLSearchParams()
  if (searchTerm) {
    qp.set('searchTerm', searchTerm)
  }

  if (pageNo) {
    qp.set('pageNo', String(parseInt(pageNo ?? '1') - 1))
  }

  const { data, headers } = await apiFetchData<CatalogItem[]>(
    `/catalog?${qp.toString()}`
  )
  const pageCount = parseInt(headers.get('X-Total-Count') ?? '1')

  if (!data?.length) {
    return (
      <Center width="full" height="full" data-cy="empty">
        No items
      </Center>
    )
  }

  return (
    <Flex direction="column" height="full" width="full" gap={2}>
      <Flex flex={1} position="relative">
        <CatalogItemTable
          items={data}
          data-cy="table"
          width="full"
          position="absolute"
          height="full"
          overflowY="auto"
        />
      </Flex>

      <Flex justify="end">
        <CatalogPaginationControls
          pageCount={pageCount}
          pageNo={parseInt(pageNo ?? '0')}
          additionalQuery={searchParams}
        />
      </Flex>
    </Flex>
  )
}
