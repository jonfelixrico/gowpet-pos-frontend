import If from '@/components/common/If'
import { BillingItem } from '@/types/Billing'
import { Box, Flex, Text } from '@chakra-ui/react'
import BillingDetailsItemTable from './BillingDetailsItemTable'

export default function BillingDetailsItemSection({
  items,
}: {
  items: BillingItem[]
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

      <Box>
        <Flex justify="space-between">
          <Text>Total</Text>
          <Text>{total}</Text>
        </Flex>
      </Box>
    </>
  )
}
