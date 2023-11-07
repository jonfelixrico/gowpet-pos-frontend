'use client'

import BillingCatalogSearch from '@/components/billing/catalog-search/BillingCatalogSearch'
import { SearchState } from '@/components/billing/catalog-search/BillingCatalogSearch'
import InputBilling from '@/components/billing/input/InputBilling'
import { Billing } from '@/types/Billing'
import { Box, Flex } from '@chakra-ui/react'
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
    <Flex width="full" height="full" gap={2}>
      <Flex flex={1} position="relative">
        <Box position="absolute" width="full" height="full" overflowY="auto">
          <InputBilling billing={billing} onChange={setBilling} />
        </Box>
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
