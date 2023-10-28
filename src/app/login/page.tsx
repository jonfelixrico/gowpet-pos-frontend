import { Card, CardBody, Flex } from '@chakra-ui/react'
import LoginForm from './LoginForm'
import { redirect } from 'next/navigation'
import { checkIfAuthenticated } from '@/utils/page-component-utils'

export default async function Login() {
  if (await checkIfAuthenticated()) {
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
