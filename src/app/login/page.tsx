import { Card, CardBody, Flex } from '@chakra-ui/react'
import LoginForm from './LoginForm'
import { redirect } from 'next/navigation'
import { getAuthToken } from '@/utils/auth-util'
import { verifyToken } from '@/server-utils/jwt-utils'

export default async function Login() {
  const authToken = getAuthToken()
  if (authToken && (await verifyToken(authToken))) {
    /*
     * This is to prevent a weird UX of still being able to access the login screen
     * even though the user is already authenticated
     */
    redirect('/home')
  }

  return (
    <Flex
      direction="column"
      align="center"
      gap="2"
      justify="center"
      height="100dvh"
    >
      <Card>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </Flex>
  )
}
