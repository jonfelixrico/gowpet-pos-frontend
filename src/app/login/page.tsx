import { Card, CardBody, Flex } from '@chakra-ui/react'
import LoginForm from '@/components/login/LoginForm'
import { RedirectType, redirect } from 'next/navigation'
import { getAuthToken } from '@/utils/auth-util'
import { verifyToken } from '@/server-utils/jwt-utils'
import { DEFAULT_ROUTE } from '@/app/default-route'
import { apiFetch } from '@/server-utils/resource-api-util'
import { cookies } from 'next/headers'
import { FetchError } from '@/utils/fetch-utils'
import { Credentials } from '@/types/login-types'

export default async function Login() {
  const authToken = getAuthToken()
  if (authToken && (await verifyToken(authToken))) {
    /*
     * This is to prevent a weird UX of still being able to access the login screen
     * even though the user is already authenticated
     */
    redirect(DEFAULT_ROUTE, RedirectType.replace)
  }

  async function authenticate(credentials: Credentials) {
    'use server'

    try {
      const response = await apiFetch('/authenticate', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      cookies().set('token', await response.text())
      redirect(DEFAULT_ROUTE)
    } catch (e) {
      if (e instanceof FetchError) {
        redirect(
          `/login?redirectError=${e.response.status}`,
          RedirectType.replace
        )
      }

      redirect('/login?redirectError=500', RedirectType.replace)
    }
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
          <LoginForm onSubmit={authenticate} />
        </CardBody>
      </Card>
    </Flex>
  )
}
