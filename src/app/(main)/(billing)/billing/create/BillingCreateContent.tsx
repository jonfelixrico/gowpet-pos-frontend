'use client'

import BillingCatalogSearch from '@/components/billing/selection/BillingCatalogSearch'
import { Flex } from '@chakra-ui/react'

export default function BillingCreateContent() {
  return (
    <Flex width="full" height="full">
      <Flex flex={1}>{/* TODO add content here */}</Flex>
      <BillingCatalogSearch onAdd={() => {}} flex={1} />
    </Flex>
  )
}
