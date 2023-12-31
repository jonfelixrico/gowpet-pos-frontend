import { Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'

export default function AccountsSettingsPage() {
  return (
    <Box height="full">
      <Flex direction="column">
        <Box height="100">
          TODO user list
          {Date.now()}
        </Box>
        <Flex justify="end">
          <Link href="./accounts/create">
            <Button colorScheme="blue">Create User</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
