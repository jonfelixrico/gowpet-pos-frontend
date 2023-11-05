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
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function PaginationControls({
  pageCount,
  pageNo,
  additionalQuery,
}: {
  pageNo: number
  pageCount: number
  additionalQuery?: Record<string, string>
}) {
  const isOnFirstPage = pageNo === 1
  const isOnLastPage = pageNo === pageCount

  function buildHref(pageNo: number) {
    return {
      path: '/catalog',
      query: {
        ...additionalQuery,
        pageNo,
      },
    }
  }

  return (
    <Flex gap={3} align="center">
      <Link href={buildHref(0)}>
        <IconButton aria-label="First page" isDisabled={isOnFirstPage}>
          <PiCaretDoubleLeftBold />
        </IconButton>
      </Link>

      <Link href={buildHref(pageNo - 1)}>
        <IconButton aria-label="Prev page" isDisabled={isOnFirstPage}>
          <PiCaretLeftBold />
        </IconButton>
      </Link>

      <Text>{`Page ${pageNo} of ${pageCount}`}</Text>

      <Link href={buildHref(pageNo + 1)}>
        <IconButton aria-label="Next page" isDisabled={isOnLastPage}>
          <PiCaretRightBold />
        </IconButton>
      </Link>

      <Link href={buildHref(pageCount - 1)}>
        <IconButton aria-label="Last page" isDisabled={isOnLastPage}>
          <PiCaretDoubleRightBold />
        </IconButton>
      </Link>
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
          additionalQuery={searchParams}
        />
      }
    />
  )
}
