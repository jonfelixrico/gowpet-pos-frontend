'use client'

import BillingItemTable from '@/app/(main)/(billing)/billing/create/input/BillingItemTable'
import { Billing } from '@/types/Billing'
import {
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
import { Dispatch, SetStateAction } from 'react'
import BillingCreateSearchDialog from './search/BillingCatalogSearchDialog'
import { SearchState } from './search/useSearch'
import { MdAdd } from 'react-icons/md'
import { Else, If, Then } from 'react-if'
import BillingItemScanButton from '@/components/billing/create/scan/BillingItemScanButton'

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
  const hasItems = billing.items.length > 0

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Card {...props}>
        <CardBody as={Flex} direction="column" gap={2}>
          <Flex align="center" justify="space-between">
            <Flex direction="column">
              <Text fontSize="xl" fontWeight="bold">
                Items
              </Text>

              <Flex gap={2}>
                <Text fontSize="sm" fontWeight="bold">
                  Total
                </Text>
                <Text fontSize="sm" data-cy="total-amount">
                  {billing.items.reduce(
                    (acc, { quantity, catalogItem }) =>
                      acc + catalogItem.price * quantity,
                    0
                  )}
                </Text>
              </Flex>
            </Flex>

            <Flex gap={2} align="center">
              <BillingItemScanButton state={[billing, setBilling]} />

              <IconButton
                size="sm"
                isRound
                aria-label="Add item"
                onClick={onOpen}
                colorScheme="blue"
                data-cy="add-items"
              >
                <MdAdd />
              </IconButton>
            </Flex>
          </Flex>

          <Divider />

          <If condition={hasItems}>
            <Then>
              <BillingItemTable billing={billing} setBilling={setBilling} />
            </Then>

            <Else>
              <Flex
                height="40dvh"
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
            </Else>
          </If>
        </CardBody>
      </Card>

      <BillingCreateSearchDialog
        isOpen={isOpen}
        onClose={onClose}
        initialState={initialState}
        billing={billing}
        setBilling={setBilling}
      />
    </>
  )
}
