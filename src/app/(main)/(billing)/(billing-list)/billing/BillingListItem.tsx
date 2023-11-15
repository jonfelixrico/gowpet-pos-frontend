import { Box, Button, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import { SavedBilling } from '../../SavedBilling'
import Link from 'next/link'
import If from '@/components/common/If'
import { DataAttributes } from '@/types/DataAttributes'

export default function BillingListItem({
  billing,
  ...dataProps
}: {
  billing: SavedBilling
} & DataAttributes) {
  const totalAmount = billing.items.reduce(
    (total, billing) => total + billing.price * billing.quantity,
    0
  )

  const totalQuantity = billing.items.reduce(
    (total, billing) => total + billing.quantity,
    0
  )

  return (
    <Card {...dataProps}>
      <CardBody as={Flex} gap={2} direction="column">
        <Flex gap={2} align="center">
          <Flex flex={1} direction="column" gap={2}>
            <Text data-cy="total-amount">{totalAmount}</Text>

            <Text data-cy="total-quantity">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </Text>
          </Flex>

          {/* Prefetch needs to be false or else we'll end up preloading all of the
          items in the list, which is going to probably request a lot of stuff from the
          servers */}
          <Link
            href={`/billing/${billing.id}`}
            prefetch={false}
            data-cy="open-details"
          >
            <Button variant="ghost">Open</Button>
          </Link>
        </Flex>

        <If condition={!!billing.notes}>
          <Box background="gray.100" padding={3} borderRadius="md">
            <Text fontWeight="bold" fontSize="xs">
              Notes
            </Text>
            <Text noOfLines={2} data-cy="notes">
              {billing.notes}
            </Text>
          </Box>
        </If>
      </CardBody>
    </Card>
  )
}
