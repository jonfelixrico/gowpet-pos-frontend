'use client'

import { Billing } from '@/types/Billing'
import {
  Card,
  CardBody,
  Divider,
  Flex,
  Spacer,
  Text,
  Textarea,
} from '@chakra-ui/react'
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
    <Flex width="full" height="full" gap={2}>
      <Card flex={1}>
        <CardBody as={Flex} direction="column" gap={2}>
          <Flex flex={1} direction="column" gap={2}>
            {/* TODO implement other features */}
            <Spacer />
            <Divider />
            <Flex direction="column" gap={2} flex={0.66}>
              <Text fontWeight="bold">Notes</Text>
              <Textarea
                flex={1}
                resize="none"
                value={billing.notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </Flex>
          </Flex>

          <Divider />

          <BillingSaveButton billing={billing} onSave={onSave} />
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
