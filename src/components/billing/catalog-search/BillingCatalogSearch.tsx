'use client'

import { CatalogItem } from '@/types/CatalogItem'
import { Box, Button, Flex, FlexProps, Input } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { fetchData } from '@/utils/fetch-utils'
import qs from 'query-string'
import If from '@/components/common/If'
import BillingCatalogSearchItem from './BillingCatalogSearchItem'
import { Billing } from '@/types/Billing'
import { produce } from 'immer'

async function fetchResults(searchTerm: string, pageNo: number) {
  const qp = qs.stringify({
    searchTerm,
    pageNo,
  })

  // TODO use API routes for this endpoint
  const { data, headers } = await fetchData<CatalogItem[]>(
    `/billing/catalog-search?${qp}`
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

export interface SearchState {
  searchTerm: string
  pageNo: number
  pageCount: number
  items: CatalogItem[]
}

type BillingCatalogSearchProps = {
  initialState: SearchState
  billing: Billing
  onBillingChange: (value: Billing) => void
} & FlexProps

export default function BillingCatalogSearch({
  initialState,
  billing,
  onBillingChange,
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

  const itemIds = useMemo(
    () => new Set(billing.items.map(({ catalogId }) => catalogId)),
    [billing]
  )

  function onItemAdd({ id, name, price }: CatalogItem) {
    onBillingChange(
      produce(billing, ({ items }) => {
        items.push({
          catalogId: id,
          name,
          price,
          quantity: 1,
        })
      })
    )
  }

  return (
    <Flex {...props} direction="column" gap={2}>
      <Flex gap={2}>
        <SearchBar triggerSearch={(searchTerm) => startSearch(searchTerm)} />
      </Flex>

      <Flex flex={1} position="relative">
        <Box height="full" width="full" position="absolute" overflowY="auto">
          <Flex direction="column" gap={2}>
            {items.map((item) => (
              <BillingCatalogSearchItem
                catalogItem={item}
                onAdd={() => onItemAdd(item)}
                key={item.id}
                canAdd={!itemIds.has(item.id)}
              />
            ))}

            <If condition={pageNo < pageCount - 1}>
              <Button onClick={() => loadMore()}>Load More</Button>
            </If>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}
