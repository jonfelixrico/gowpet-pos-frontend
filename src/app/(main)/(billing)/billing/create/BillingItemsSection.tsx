'use client'

import InputBillingItemList from '@/app/(main)/(billing)/billing/create/input/InputBillingItemList'
import { Billing } from '@/types/Billing'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardProps,
  Divider,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useMemo } from 'react'
import BillingCreateSearchDialog from './search/BillingCatalogSearchDialog'
import { produce } from 'immer'
import { CatalogItem } from '@/types/CatalogItem'
import { SearchState } from './search/useSearch'
import If from '@/components/common/If'
import { MdAdd } from 'react-icons/md'

interface BillingStateProps {
  billing: Billing
  setBilling: Dispatch<SetStateAction<Billing>>
}

export default function BillingItemsSection({
  initialState,
  billing,
  setBilling,
  ...props
}: {
  initialState: SearchState
} & CardProps &
  BillingStateProps) {
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
      <Card {...props}>
        <CardBody as={Flex} direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="medium">
              Items
            </Text>
            <IconButton
              size="sm"
              isRound
              aria-label="Add item"
              onClick={onOpen}
              colorScheme="blue"
            >
              <MdAdd />
            </IconButton>
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
                <InputBillingItemList billing={billing} onChange={setBilling} />
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

          <Divider />

          <Flex justify="space-between">
            <Text fontWeight="bold">Total</Text>
            <Text>
              {billing.items.reduce(
                (acc, val) => acc + val.price * val.quantity,
                0
              )}
            </Text>
          </Flex>
        </CardBody>
      </Card>

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
