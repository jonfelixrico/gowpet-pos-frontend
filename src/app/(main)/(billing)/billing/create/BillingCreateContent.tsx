'use client'

import BillingCatalogSearch from '@/components/billing/catalog-search/BillingCatalogSearch'
import { SearchState } from '@/components/billing/catalog-search/BillingCatalogSearch'
import { Billing } from '@/types/Billing'
import { CatalogItem } from '@/types/CatalogItem'
import { Flex } from '@chakra-ui/react'
import { produce } from 'immer'
import { useState } from 'react'

export default function BillingCreateContent({
  initialState,
}: {
  initialState: SearchState
}) {
  const [billing, setBilling] = useState<Billing>({
    items: [],
  })

  function onItemAdd({ id, name, price }: CatalogItem) {
    setBilling((billing) =>
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
    <Flex width="full" height="full">
      <Flex flex={1}>{JSON.stringify(billing)}</Flex>
      <BillingCatalogSearch
        initialState={initialState}
        flex={1}
        onAdd={onItemAdd}
      />
    </Flex>
  )
}
