'use client'

import BillingCatalogSearch from '@/components/billing/catalog-search/BillingCatalogSearch'
import { SearchState } from '@/components/billing/catalog-search/BillingCatalogSearch'
import InputBilling from '@/components/billing/input/InputBilling'
import { Billing } from '@/types/Billing'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react'

export default function BillingCreateContent({
  initialState,
}: {
  initialState: SearchState
}) {
  const [billing, setBilling] = useState<Billing>({
    items: [],
  })

  return (
    <Flex width="full" height="full">
      <Flex flex={1}>
        <InputBilling billing={billing} onChange={setBilling} />
      </Flex>
      <BillingCatalogSearch
        initialState={initialState}
        flex={1}
        onBillingChange={setBilling}
        billing={billing}
      />
    </Flex>
  )
}
