'use client'

import BillingCatalogSearch from '@/app/(main)/(billing)/billing/create/search/BillingCatalogSearch'
import { SearchState } from '@/app/(main)/(billing)/billing/create/search/BillingCatalogSearch'
import InputBilling from '@/components/billing/input/InputBilling'
import { Billing } from '@/types/Billing'
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import BillingCreateSearchDialog from './search/BillingCatalogSearchDialog'

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
      <Flex width="full" height="full" gap={2} direction="column">
        <Flex flex={1} gap={2}>
          <Card flex={1}>
            <CardBody as={Flex} direction="column" gap={2}>
              <Flex flex={1}>
                <InputBilling billing={billing} onChange={setBilling} />
              </Flex>

              <Divider />

              <Button onClick={onOpen}>Add Items</Button>
            </CardBody>
          </Card>

          <Card flex={1}>
            <CardBody></CardBody>
          </Card>
        </Flex>

        <form action={() => onSave(billing)}>
          <Button width="full" colorScheme="blue" type="submit">
            Save
          </Button>
        </form>
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
