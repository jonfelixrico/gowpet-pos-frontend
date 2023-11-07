'use client'

import BillingCatalogSearch from '@/components/billing/catalog-search/BillingCatalogSearch'
import { SearchState } from '@/components/billing/catalog-search/BillingCatalogSearch'
import { Flex } from '@chakra-ui/react'

export default function BillingCreateContent({
  initialState,
}: {
  initialState: SearchState
}) {
  return (
    <Flex width="full" height="full">
      <Flex flex={1}>{/* TODO add content here */}</Flex>
      <BillingCatalogSearch
        initialState={initialState}
        flex={1}
        onAdd={() => {}}
      />
    </Flex>
  )
}
