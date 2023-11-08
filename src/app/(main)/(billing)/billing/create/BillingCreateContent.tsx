'use client'

import BillingCatalogSearch from '@/components/billing/catalog-search/BillingCatalogSearch'
import { SearchState } from '@/components/billing/catalog-search/BillingCatalogSearch'
import InputBilling from '@/components/billing/input/InputBilling'
import { Billing } from '@/types/Billing'
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import BillingCreateSearchDialog from './BillingCreateSearchDialog'

export default function BillingCreateContent({
  initialState,
  onSave,
}: {
  initialState: SearchState
  onSave: (billing: Billing) => void
}) {
  const [billing, setBilling] = useState<Billing>({
    items: [],
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex width="full" height="full" gap={2}>
        <Flex flex={1} direction="column">
          <Flex flex={1} position="relative">
            <Box
              position="absolute"
              width="full"
              height="full"
              overflowY="auto"
            >
              <InputBilling billing={billing} onChange={setBilling} />
            </Box>
          </Flex>

          <form action={() => onSave(billing)}>
            <Button width="full" colorScheme="blue" type="submit">
              Save
            </Button>
          </form>
        </Flex>
      </Flex>

      <BillingCreateSearchDialog isOpen={isOpen} onClose={onClose}>
        <BillingCatalogSearch
          initialState={initialState}
          onBillingChange={setBilling}
          billing={billing}
        />
      </BillingCreateSearchDialog>
    </>
  )
}
