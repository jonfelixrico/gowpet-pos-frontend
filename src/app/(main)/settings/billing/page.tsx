import { Box, Divider, Flex, Text } from '@chakra-ui/react'

export default function BillingSettingsPage() {
  return (
    <Box height="full">
      <Flex gap={2} direction="column">
        <Text fontWeight="medium" fontSize="lg">
          Receipt
        </Text>
        <Divider />
      </Flex>
    </Box>
  )
}
