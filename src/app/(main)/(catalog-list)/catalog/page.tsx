import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogItemTable from './CatalogItemTable'
import { Center, IconButton } from '@chakra-ui/react'
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
  return (
    <>
      <IconButton aria-label="First page">
        <PiCaretDoubleLeftBold />
      </IconButton>

      <IconButton aria-label="Prev page" disabled={pageNo === 0}>
        <PiCaretLeftBold />
      </IconButton>

      <IconButton aria-label="Next page" disabled={pageNo === pageCount - 1}>
        <PiCaretRightBold />
      </IconButton>

      <IconButton aria-label="Last page">
        <PiCaretDoubleRightBold />
      </IconButton>
    </>
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
