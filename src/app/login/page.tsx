import { Card, CardBody, Flex } from '@chakra-ui/react'
import LoginForm from './LoginForm'
import { cookies } from 'next/headers'
import { verifyToken } from '@/utils/jwt-utils'
import { redirect } from 'next/navigation'

export default async function Login() {
  const cookiesStore = cookies()
  const tokenCookie = cookiesStore.get('token')?.value
  if (tokenCookie && (await verifyToken(tokenCookie))) {
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
