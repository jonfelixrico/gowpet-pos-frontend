import { Flex, FlexProps, Text } from '@chakra-ui/react'
import BillingListItem from './BillingListItem'
import RefreshButton from '@/components/RefreshButton'
import { SavedBilling } from '@/types/SavedBilling'

export default function BillingListContent({
  billings,
  ...flexProps
}: {
  billings: SavedBilling[]
} & FlexProps) {
  if (!billings.length) {
    return (
      <Flex
        {...flexProps}
        direction="column"
        justify="center"
        align="center"
        gap={2}
        data-cy="empty-message"
      >
        <Text>No items to show</Text>
        <RefreshButton>Try again</RefreshButton>
      </Flex>
    )
  }

  return (
    <Flex {...flexProps} direction="column" gap={2} data-cy="content">
      {billings.map((billing) => (
        <BillingListItem
          billing={billing}
          key={billing.id}
          data-cy="billing-record"
        />
      ))}
    </Flex>
  )
}
