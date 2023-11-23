import { Divider, Flex, Text } from '@chakra-ui/react'

export default function ReceiptSettings() {
  return (
    <Flex gap={2} direction="column">
      <Text fontWeight="medium" fontSize="lg">
        Receipt
      </Text>

      <Divider />
    </Flex>
  )
}
