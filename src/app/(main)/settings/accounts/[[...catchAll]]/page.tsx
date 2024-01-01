import UserTable from '@/components/settings/user/list/UserTable'
import { apiFetchData } from '@/server-utils/resource-api-util'
import User from '@/types/User'
import { Button, Center, Divider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { Else, If, Then } from 'react-if'

export default async function AccountsSettingsPage() {
  /*
    The BE endpoint supports pagination but since we don't expect a huge number of users, there is no need to implement
    it in the FE yet.

    TODO support pagination
   */
  const { data } = await apiFetchData<User[]>('/user?itemCount=999', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <Flex height="full" direction="column" gap={2}>
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold">
          User List
        </Text>
        <Link href="./accounts/create" prefetch={false}>
          <Button colorScheme="blue">Create User</Button>
        </Link>
      </Flex>

      <Divider />

      <If condition={data.length}>
        <Then>
          <UserTable users={data} />
        </Then>

        <Else>
          <Center flex={1}>
            <Text fontSize="xl">No users to display</Text>
          </Center>
        </Else>
      </If>
    </Flex>
  )
}
