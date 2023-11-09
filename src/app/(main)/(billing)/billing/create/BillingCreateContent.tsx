'use client'

import { Billing } from '@/types/Billing'
import { Button, Card, CardBody, Divider, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { SearchState } from './search/useSearch'
import BillingItemsSection from './BillingItemsSection'

export default function BillingCreateContent({
  initialState,
  onSave,
}: {
  initialState: SearchState
  onSave: (billing: Billing) => void
}) {
  const [billing, setBilling] = useState<Billing>({
    items: [],
    notes: '',
  })

  return (
    <Flex width="full" height="full" gap={2}>
      <Card flex={1}>
        <CardBody as={Flex} direction="column" gap={2}>
          <Flex flex={1}></Flex>

          <Divider />

          <form action={() => onSave(billing)}>
            <Button width="full" colorScheme="blue" type="submit">
              Save
            </Button>
          </form>
        </CardBody>
      </Card>

      <BillingItemsSection
        billing={billing}
        setBilling={setBilling}
        initialState={initialState}
        flex={1}
      />
    </Flex>
  )
}
