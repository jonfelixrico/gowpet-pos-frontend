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
  const hasItems = billing.items.length > 0

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Card {...props}>
        <CardBody as={Flex} direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">
              Items
            </Text>
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

          <Flex gap={2}>
            <Text fontSize="sm" fontWeight="bold">
              Total
            </Text>
            <Text fontSize="sm" data-cy="total-amount">
              {billing.items.reduce(
                (acc, val) => acc + val.price * val.quantity,
                0
              )}
            </Text>
          </Flex>

          <Divider />

          <If condition={hasItems}>
            <BillingItemTable billing={billing} onChange={setBilling} />
          </If>

          <If condition={!hasItems}>
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
