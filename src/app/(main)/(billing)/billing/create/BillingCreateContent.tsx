'use client'

import InputBillingItemList from '@/app/(main)/(billing)/billing/create/input/InputBillingItemList'
import { Billing } from '@/types/Billing'
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import BillingCreateSearchDialog from './search/BillingCatalogSearchDialog'
import { produce } from 'immer'
import { CatalogItem } from '@/types/CatalogItem'
import { SearchState } from './search/useSearch'
import If from '@/components/common/If'
import { MdAdd } from 'react-icons/md'

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

  const hasItems = billing.items.length > 0

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
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

        <Card flex={1}>
          <CardBody as={Flex} direction="column" gap={2}>
            <Flex justify="space-between" align="center">
              <Text fontSize="xl" fontWeight="medium">
                Items
              </Text>
              <Button onClick={onOpen}>
                <Flex align="center" gap={2}>
                  <MdAdd />
                  <Text>Add Items</Text>
                </Flex>
              </Button>
            </Flex>

            <Divider />

            <If condition={hasItems}>
              <Flex flex={1} position="relative">
                <Box
                  position="absolute"
                  height="full"
                  width="full"
                  overflowY="auto"
                >
                  <InputBillingItemList
                    billing={billing}
                    onChange={setBilling}
                  />
                </Box>
              </Flex>
            </If>

            <If condition={!hasItems}>
              <Flex
                flex={1}
                direction="column"
                justify="center"
                align="center"
                gap={2}
              >
                <Text fontSize="lg">No items yet</Text>
                <Button size="xs" onClick={onOpen}>
                  Add Items
                </Button>
              </Flex>
            </If>
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
