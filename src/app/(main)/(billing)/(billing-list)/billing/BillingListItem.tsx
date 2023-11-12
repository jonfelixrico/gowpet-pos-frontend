import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { SavedBilling } from '../../BillingDetailsData'
import Link from 'next/link'
import If from '@/components/common/If'

export default function BillingListItem({
  billing,
}: {
  billing: SavedBilling
}) {
  const totalAmount = billing.items.reduce(
    (total, billing) => total + billing.price * billing.quantity,
    0
  )

  const totalQuantity = billing.items.reduce(
    (total, billing) => total + billing.quantity,
    0
  )

  return (
    <Card>
      <CardBody as={Flex} gap={2} direction="column">
        <Flex gap={2} align="center">
          <Flex flex={1} direction="column" gap={2}>
            <Text>{totalAmount}</Text>

            <Text>
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </Text>
          </Flex>

          <Link href={`/billing/${billing.id}`} prefetch={false}>
            <Button variant="ghost">Open</Button>
          </Link>
        </Flex>

        <If condition={!!billing.notes}>
          <Box background="gray.100" padding={3} borderRadius="md">
            <Text fontWeight="bold" fontSize="xs">
              Notes
            </Text>
            <Text noOfLines={2}>{billing.notes}</Text>
          </Box>
        </If>
      </CardBody>
    </Card>
  )
}
