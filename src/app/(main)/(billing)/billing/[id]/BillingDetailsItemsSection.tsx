import If from '@/components/common/If'
import { Flex, Text } from '@chakra-ui/react'
import BillingDetailsItemTable from './BillingDetailsItemsTable'
import { BillingDetailsItemData } from './BillingDetailsData'

export default function BillingDetailsItemsSection({
  items,
}: {
  items: BillingDetailsItemData[]
}) {
  const hasItems = !!items.length
  const total = items.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  )

  return (
    <>
      <If condition={hasItems}>
        <BillingDetailsItemTable items={items} />
      </If>

      <If condition={!hasItems}>
        <Flex justify="center" align="center" height="50dvh">
          <Text>There are no items</Text>
        </Flex>
      </If>

      <Flex justify="space-between">
        <Text fontWeight="bold">Total</Text>
        <Text>{total}</Text>
      </Flex>
    </>
  )
}
