'use client'

import { CatalogItem } from '@/types/CatalogItem'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import { useBillingCatalogSearch } from './useBillingCatalogSearch'
import { useMount } from 'react-use'

interface BillingCatalogSearchProps {
  onAdd: (item: CatalogItem) => void
}

function Search({
  children,
}: {
  children: (items: CatalogItem[]) => ReactNode
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
    <Flex direction="column">
      <Flex>
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button onClick={() => doSearch()}>Search</Button>
      </Flex>

      <Flex flex={1}>{children(items)}</Flex>

      <Flex>
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
}: BillingCatalogSearchProps) {
  return (
    <Flex direction="column">
      <Flex>
        <Input />
      </Flex>
      <Flex flex={1}>{/* TODO add content */}</Flex>
      <Flex>Test</Flex>
    </Flex>
  )
}
