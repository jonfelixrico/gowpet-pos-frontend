import { Box, Button, Center, Divider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function AccountsSettingsPage() {
  return (
    <Flex height="full" direction="column" gap={2}>
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold">
          User List
        </Text>
        <Link href="./accounts/create">
          <Button colorScheme="blue">Create User</Button>
        </Link>
      </Flex>

      <Divider />

      <Center flex={1}>
        <Text fontSize="xl">No users to display</Text>
      </Center>
    </Flex>
  )
}
