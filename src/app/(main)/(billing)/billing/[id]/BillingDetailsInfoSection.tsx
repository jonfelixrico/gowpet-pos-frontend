import { SavedBilling } from '@/types/SavedBilling'
import { Flex, Text, Textarea } from '@chakra-ui/react'

export default function BillingDetailsInfoSection({
  billing,
}: {
  billing: SavedBilling
}) {
  return (
    <>
      <Flex direction="column" gap={2}>
        <Text fontWeight="bold">Notes</Text>
        <Textarea isReadOnly resize="none" value={billing.notes} />
      </Flex>
    </>
  )
}
