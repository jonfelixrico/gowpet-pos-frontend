import { Text } from '@chakra-ui/react'

export default function BillingSerialNo({ serialNo }: { serialNo: number }) {
  return (
    <Text fontSize="xl" fontWeight="bold">
      No. <span data-cy="serial-no">{String(serialNo).padStart(4, '0')}</span>
    </Text>
  )
}
