import { Card, CardBody, Flex } from '@chakra-ui/react'
import LoginForm from '@/components/login/LoginForm'
import { RedirectType, redirect } from 'next/navigation'
import { DEFAULT_ROUTE } from '@/app/default-route'
import { apiFetch } from '@/server-utils/resource-api-util'
import { cookies } from 'next/headers'
import { ApiResponse, FetchError } from '@/utils/fetch-utils'
import { Credentials } from '@/types/login-types'

export default async function Login() {
  async function authenticate(credentials: Credentials) {
    'use server'

    /*
     * Can't use try-catch here because of this weird Next bug:
     * https://github.com/vercel/next.js/issues/49298#issuecomment-1649261356
     */

    const result: Error | ApiResponse<undefined> = await apiFetch(
      '/authenticate',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res)
      .catch((err) => err)

    if (result instanceof FetchError) {
      redirect(
        `/login?authError=${result.response.status}`,
        RedirectType.replace
      )
    } else if (result instanceof Error) {
      redirect('/login?authError=500', RedirectType.replace)
    } else {
      cookies().set('token', await result.text())
      redirect(DEFAULT_ROUTE)
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
