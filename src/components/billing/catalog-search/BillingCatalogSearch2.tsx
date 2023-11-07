'use client'

import { CatalogItem } from '@/types/CatalogItem'
import { Box, Button, Flex, FlexProps, Input, Text } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import { fetchData } from '@/utils/fetch-utils'
import qs from 'query-string'
import Cookies from 'js-cookie'
import If from '@/components/common/If'

async function fetchResults(searchTerm: string, pageNo: number) {
  const qp = qs.stringify({
    searchTerm,
    pageNo,
  })

  // TODO use API routes for this endpoint
  const { data, headers } = await fetchData<CatalogItem[]>(
    `/api/catalog?${qp}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }
  )
  const pageCount = headers.get('X-Total-Count')
  if (pageCount === null) {
    throw new Error('Data error: page count not incldued')
  }

  return {
    items: data,
    pageCount: parseInt(pageCount),
  }
}

function SearchBar({
  triggerSearch,
}: {
  triggerSearch: (searchTerm: string) => void
}) {
  const [input, setInput] = useState('')

  return (
    <>
      <Input value={input} onChange={(event) => setInput(event.target.value)} />
      <Button onClick={() => triggerSearch(input)}>Search</Button>
    </>
  )
}

interface SearchState {
  searchTerm: string
  pageNo: number
  pageCount: number
  items: CatalogItem[]
}

type BillingCatalogSearchProps = {
  children: (item: CatalogItem) => ReactNode
  initialState: SearchState
} & Omit<FlexProps, 'children'>

export default function BillingCatalogSearch2({
  children,
  initialState,
  ...props
}: BillingCatalogSearchProps) {
  const [{ items, pageCount, pageNo, searchTerm }, setSearchState] =
    useState<SearchState>(initialState)

  async function startSearch(searchTerm: string) {
    const { items, pageCount } = await fetchResults(searchTerm, 0)
    setSearchState({
      pageNo: 0,
      pageCount,
      searchTerm,
      items,
    })
  }

  async function loadMore() {
    const newPageNo = pageNo + 1

    const { items: fetchedItems, pageCount } = await fetchResults(
      searchTerm,
      newPageNo
    )

    setSearchState(({ searchTerm, items }) => {
      return {
        pageCount,
        pageNo: newPageNo,
        searchTerm,
        items: items.concat(fetchedItems),
      }
    })
  }

  return (
    <Flex {...props} direction="column" gap={2}>
      <Flex gap={2}>
        <SearchBar triggerSearch={(searchTerm) => startSearch(searchTerm)} />
      </Flex>

      <Flex flex={1} position="relative">
        <Box height="full" width="full" position="absolute" overflowY="auto">
          <Flex direction="column" gap={2}>
            {items.map(children)}

            <If condition={pageNo < pageCount - 1}>
              <Button onClick={() => loadMore()}>Load More</Button>
            </If>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}
