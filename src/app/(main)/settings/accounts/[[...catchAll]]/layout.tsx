import { Button, Divider, Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default async function UsersListLayout({ children }: { children: ReactNode }) {
  return (
    <Flex height="full" direction="column" gap={2}>
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold">
          User List
        </Text>
        <a href="/settings/accounts/create">
          <Button colorScheme="blue">Create User</Button>
        </a>
      </Flex>

      <Divider />

      {children}
    </Flex>
  )
}
