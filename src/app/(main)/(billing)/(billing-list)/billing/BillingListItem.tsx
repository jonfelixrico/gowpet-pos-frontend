import {
  Box,
  Button,
  Card,
  CardBody,
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
  return (
    <Card>
      <CardBody as={Flex} gap={2} align="center">
        <Box flex={1}>
          <If condition={!billing.notes}>
            <Text noOfLines={2}>{billing.notes}</Text>
          </If>
        </Box>

        <Link href={`/billing/${billing.id}`} prefetch={false}>
          <Button variant="ghost">Open</Button>
        </Link>
      </CardBody>
    </Card>
  )
}
