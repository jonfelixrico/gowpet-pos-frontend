'use client'

import { Billing } from '@/types/Billing'
import { Card, CardBody, Divider, Flex, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { SearchState } from './search/useSearch'
import BillingItemsSection from './BillingItemsSection'
import { produce } from 'immer'
import BillingSaveButton from './BillingSaveButton'

export default function BillingCreateContent({
  initialState,
  onSave,
}: {
  initialState: SearchState
  /**
   * Server action saving the billing
   */
  onSave: (billing: Billing) => void
}) {
  const [billing, setBilling] = useState<Billing>({
    items: [],
    notes: '',
  })

  function setNotes(value: string) {
    setBilling((inState) =>
      produce(inState, (billing) => {
        billing.notes = value
      })
    )
  }

  return (
    <Flex width="full" height="full" gap={2} direction="column">
      <Card>
        <CardBody as={Flex} direction="column" gap={2}>
          <Flex justify="space-between">
            {/* TODO add back button */}
            <Text fontSize="xl" fontWeight="bold">
              Create Billing
            </Text>
            <BillingSaveButton billing={billing} onSave={onSave} />
          </Flex>

          <Divider />

          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">Notes</Text>
            <Textarea
              flex={1}
              resize="none"
              value={billing.notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </Flex>
        </CardBody>
      </Card>

      <BillingItemsSection
        billing={billing}
        setBilling={setBilling}
        initialState={initialState}
      />
    </Flex>
  )
}
