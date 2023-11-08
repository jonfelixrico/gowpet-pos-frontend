'use client'

import InputBillingItemList from '@/app/(main)/(billing)/billing/create/input/InputBillingItemList'
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
import { useMemo, useState } from 'react'
import BillingCreateSearchDialog from './search/BillingCatalogSearchDialog'
import { produce } from 'immer'
import { CatalogItem } from '@/types/CatalogItem'
import { SearchState } from './search/useSearch'

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

  const alreadyAdded = useMemo(
    () => new Set(billing.items.map(({ catalogId }) => catalogId)),
    [billing]
  )

  function addItemToBilling({ id, name, price }: CatalogItem) {
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

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex width="full" height="full" gap={2}>
        <Card flex={1}>
          <CardBody as={Flex} direction="column" gap={2}>
            <Flex flex={1} position="relative">
              <Box
                position="absolute"
                height="full"
                width="full"
                overflowY="auto"
              >
                <InputBillingItemList billing={billing} onChange={setBilling} />
              </Box>
            </Flex>

            <Divider />

            <Button onClick={onOpen}>Add Items</Button>
          </CardBody>
        </Card>

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
      </Flex>

      <BillingCreateSearchDialog
        isOpen={isOpen}
        onClose={onClose}
        initialState={initialState}
        cannotAdd={alreadyAdded}
        onAdd={addItemToBilling}
      />
    </>
  )
}
