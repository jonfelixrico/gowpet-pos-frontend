import { Divider, Flex, FlexProps, Text } from '@chakra-ui/react'
import BillingListItem from './BillingListItem'
import RefreshButton from '@/components/RefreshButton'
import { SavedBilling } from '@/types/SavedBilling'
import { If, Then } from 'react-if'

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
    <Flex {...flexProps} direction="column" gap={3} data-cy="content">
      {billings.map((billing, index) => (
        <Flex key={billing.id} direction='column' gap={3}>
          <BillingListItem
            billing={billing}
            data-cy="billing-record"
          />

          <If condition={index < billings.length - 1}>
            <Then>
              <Divider />
            </Then>
          </If>
        </Flex>
      ))}
    </Flex>
  )
}
