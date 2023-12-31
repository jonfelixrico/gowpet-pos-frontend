import { Box, Button, Flex } from '@chakra-ui/react'

export default function AccountsSettingsPage() {
  return (
    <Box height="full">
      <Flex direction="column">
        <Box height="100">TODO user list</Box>
        <Flex justify="end">
          <Button colorScheme="blue">Create User</Button>
        </Flex>
      </Flex>
    </Box>
  )
}
