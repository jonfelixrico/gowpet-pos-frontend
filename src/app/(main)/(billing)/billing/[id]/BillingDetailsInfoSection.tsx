import If from '@/components/common/If'
import { SavedBilling } from '@/types/SavedBilling'
import { Box, Flex, Text, Textarea } from '@chakra-ui/react'

export default function BillingDetailsInfoSection({
  billing,
}: {
  billing: SavedBilling
}) {
  return (
    <>
      <Flex align="center" justify="end" gap={1}>
        <Text fontSize="sm" fontWeight="medium">
          No.
        </Text>
        <Text fontSize="lg" fontWeight="medium" data-cy="serial-no">
          {String(billing.serialNo).padStart(4, '0')}
        </Text>
      </Flex>

      <Flex direction="column" gap={2}>
        <Text fontWeight="bold">Notes</Text>

        <If condition={!!billing.notes}>
          <Textarea
            isReadOnly
            resize="none"
            value={billing.notes}
            data-cy="notes"
          />
        </If>

        <If condition={!billing.notes}>
          <Textarea
            isReadOnly
            resize="none"
            placeholder="No notes provided"
            value=""
            data-cy="empty-notes"
          />
        </If>
      </Flex>
    </>
  )
}
