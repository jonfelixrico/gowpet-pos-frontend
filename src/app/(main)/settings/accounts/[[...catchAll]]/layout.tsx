import { Button, Divider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function UsersListLayout({ children }: { children: ReactNode }) {
  return (
    <Flex height="full" direction="column" gap={2}>
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold">
          User List
        </Text>
        <Link href="/settings/accounts/create" prefetch={false}>
          <Button colorScheme="blue">Create User</Button>
        </Link>
      </Flex>

      <Divider />

      {children}
    </Flex>
  )
}
