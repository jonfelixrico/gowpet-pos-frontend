import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default async function UsersListLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Flex height="full" direction="column" gap={2}>
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold">
          User List
        </Text>

        {/*
          The page seems to break if we use Next's Link component here.
          The app throws an error similar to this: https://github.com/vercel/next.js/issues/52862 but it's complaining about
          the Link component instead.

          TODO use Link component once Next.js fixes the problem
        */}
        <a href="/settings/user/create">
          <Button colorScheme="blue">Create User</Button>
        </a>
      </Flex>

      <Divider />

      <Box flex={1}>{children}</Box>
    </Flex>
  )
}
