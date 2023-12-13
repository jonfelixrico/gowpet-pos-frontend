import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import LoginForm from '@/components/login/LoginForm'
import { RedirectType, redirect } from 'next/navigation'
import { DEFAULT_ROUTE } from '@/app/default-route'
import { apiFetch } from '@/server-utils/resource-api-util'
import { cookies } from 'next/headers'
import { ApiResponse, FetchError } from '@/utils/fetch-utils'
import { Credentials } from '@/types/login-types'
import qs from 'query-string'
import { Case, Default, Else, If, Switch, Then } from 'react-if'

export default async function Login({
  searchParams,
}: {
  searchParams: Record<string, string> & {
    loginRedirect: string
    authError: string
  }
}) {
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

    if (result instanceof Error) {
      const status = result instanceof FetchError ? result.response.status : 500

      const queryParams = qs.stringify({
        ...searchParams,
        authError: status,
      })
      redirect(`/login?${queryParams}`, RedirectType.replace)
    } else {
      cookies().set('token', await result.text())
      redirect(searchParams.loginRedirect ?? DEFAULT_ROUTE)
    }
  }

  return (
    <Box width="100dvw" height="100dvh" background="gray.100">
      <Container
        maxW="container.sm"
        as={Flex}
        direction="column"
        gap="2"
        height="full"
      >
        <If condition={searchParams.authError}>
          <Then>
            <Flex flex={1} direction="column" justify="end">
              <Alert status="error" data-cy="login-error">
                <AlertTitle>Login failed!</AlertTitle>
                <AlertDescription>
                  <Switch>
                    <Case condition={searchParams.authError === '403'}>
                      <span data-cy="wrong-credentials">
                        Incorrect username or password.
                      </span>
                    </Case>

                    <Default>
                      An unexpected error ocurred. Please try again later.
                    </Default>
                  </Switch>
                </AlertDescription>
              </Alert>
            </Flex>
          </Then>

          <Else>
            <Spacer />
          </Else>
        </If>

        <Card width="full">
          <CardBody>
            <LoginForm onSubmit={authenticate} />
          </CardBody>
        </Card>

        <Spacer />
      </Container>
    </Box>
  )
}
