'use client'

import { CatalogItem } from '@/types/CatalogItem'
import { Box, Button, Flex, FlexProps, Input, Text } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import { useBillingCatalogSearch } from './useBillingCatalogSearch'
import { useMount } from 'react-use'
import BillingCatalogSearchItem from './BillingCatalogSearchItem'

interface BillingCatalogSearchProps {
  onAdd: (item: CatalogItem) => void
}

function Search({
  children,
  ...props
}: Omit<FlexProps, 'children'> & {
  children: (item: CatalogItem) => ReactNode
}) {
  const [items, setItems] = useState<CatalogItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [pageNo, setPageNo] = useState(0)

  const { fetchResults } = useBillingCatalogSearch()
  async function doSearch(pageNo: number = 0) {
    const { items, pageCount } = await fetchResults(searchTerm, pageNo)
    setItems(items)
    setPageCount(pageCount)
    setPageNo(pageNo)
  }

  useMount(() => {
    // this is to do the initial search
    doSearch()
  })

  return (
    <Flex {...props} direction="column" gap={2}>
      <Flex gap={2}>
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button onClick={() => doSearch()}>Search</Button>
      </Flex>

      <Flex flex={1} position="relative">
        <Box height="full" width="full" position="absolute" overflowY="auto">
          <Flex direction="column" gap={2}>
            {items.map(children)}
          </Flex>
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Button onClick={() => doSearch(pageNo - 1)} isDisabled={pageNo === 0}>
          Prev
        </Button>

        <Text>
          Page {pageNo + 1} of {pageCount}
        </Text>

        <Button
          onClick={() => doSearch(pageNo + 1)}
          isDisabled={pageNo >= pageCount - 1}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  )
}

export default function BillingCatalogSearch({
  onAdd,
}: BillingCatalogSearchProps & Omit<FlexProps, 'children'>) {
  return (
    <Search>
      {(item) => (
        <BillingCatalogSearchItem
          key={item.id}
          onAdd={() => onAdd(item)}
          canAdd={true}
          catalogItem={item}
        />
      )}
    </Search>
  )
}
