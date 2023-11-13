import If from '@/components/common/If'
import { Flex, Text } from '@chakra-ui/react'
import BillingDetailsItemsTable from './BillingDetailsItemsTable'
import { SavedBillingItem } from '../../BillingDetailsData'

export default function BillingDetailsItemsSection({
  items,
}: {
  items: SavedBillingItem[]
}) {
  const hasItems = !!items.length
  const total = items.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  )

  return (
    <>
      <If condition={hasItems}>
        <BillingDetailsItemsTable items={items} data-cy="items-table" />
      </If>

      <If condition={!hasItems}>
        <Flex justify="center" align="center" height="50dvh" data-cy="no-items">
          <Text>There are no items</Text>
        </Flex>
      </If>

      <Flex justify="space-between">
        <Text fontWeight="bold">Total</Text>
        <Text data-cy="total-amount">{total}</Text>
      </Flex>
    </>
  )
}
