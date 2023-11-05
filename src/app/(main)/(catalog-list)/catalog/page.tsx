import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogItemTable from './CatalogItemTable'
import { Center, Flex, IconButton, Text } from '@chakra-ui/react'
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from 'react-icons/pi'

export const dynamic = 'force-dynamic'

function PaginationControls({
  pageCount,
  pageNo,
}: {
  pageNo: number
  pageCount: number
}) {
  const isOnFirstPage = pageNo === 0
  const isOnLastPage = pageNo === pageCount - 1
  return (
    <Flex gap={3} align="center">
      <IconButton aria-label="First page" isDisabled={isOnFirstPage}>
        <PiCaretDoubleLeftBold />
      </IconButton>

      <IconButton aria-label="Prev page" isDisabled={isOnFirstPage}>
        <PiCaretLeftBold />
      </IconButton>

      <Text>{`Page ${pageNo + 1} of ${pageCount}`}</Text>

      <IconButton aria-label="Next page" isDisabled={isOnLastPage}>
        <PiCaretRightBold />
      </IconButton>

      <IconButton aria-label="Last page" isDisabled={isOnLastPage}>
        <PiCaretDoubleRightBold />
      </IconButton>
    </Flex>
  )
}

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
        <PaginationControls
          pageCount={pageCount}
          pageNo={parseInt(searchParams.pageNo ?? '0')}
        />
      }
    />
  )
}
