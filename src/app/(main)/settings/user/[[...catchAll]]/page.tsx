import UserTable from '@/components/settings/user/list/UserTable'
import { apiFetchData } from '@/server-utils/resource-api-util'
import User from '@/types/User'
import { Box, Center, Text } from '@chakra-ui/react'
import { Else, If, Then } from 'react-if'

/*
 * By using an optional catch-all route instead of a static route, we can show the same content for the list endpoint (/) and the
 * create endpoint (/create) for the module.
 *
 * Technically we can achieve the same effect by creating a static route for / and /create, but when switching between those two routes they will
 * end up "refreshing". By using an optional catch-all route, we're telling Next that there's no need to "refresh" the content.
 *
 * TODO throw 404 if the user tried accessing any path aside from / or /create
 */
export default async function UserListPage() {
  /*
    The BE endpoint supports pagination but since we don't expect a huge number of users, there is no need to implement
    it in the FE yet.

    TODO support pagination
   */
  const { data } = await apiFetchData<User[]>('/user?itemCount=999')

  return (
    <Box data-page="user-list" width="full" height="full">
      <If condition={data.length}>
        <Then>
          <UserTable users={data} />
        </Then>

        <Else>
          <Center width="full" height="full">
            <Text fontSize="xl">No users to display</Text>
          </Center>
        </Else>
      </If>
    </Box>
  )
}
