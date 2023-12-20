import { Box, Card, CardBody, Center, Container, Flex } from '@chakra-ui/react'
import { RedirectType, redirect } from 'next/navigation'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CreateUserForm from '@/components/user/CreateUserForm'
import { Credentials } from '@/types/login-types'
import { revalidateTag } from 'next/cache'

const ROOT_SETUP_TAG = 'root-setup'

async function shouldProceedWithRootSetup() {
  try {
    const { data } = await apiFetchData<{ hasRootUserBeenSetUp: boolean }>(
      '/user/root',
      {
        next: {
          tags: [ROOT_SETUP_TAG],
        },
      }
    )

    return !data.hasRootUserBeenSetUp
  } catch (e) {
    console.error('Error encountered while checking if root setup is ready', e)
    return false
  }
}

export default async function RootSetup() {
  if (!(await shouldProceedWithRootSetup())) {
    redirect('/', RedirectType.replace)
  }

  async function createUser(credentials: Credentials) {
    'use server'

    await apiFetchData<{ hasRootBeenSetUp: boolean }>('/user/root', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    revalidateTag(ROOT_SETUP_TAG)
    redirect('/login', RedirectType.replace)

    // TODO do error handling
  }

  return (
    <Box width="100dvw" height="100dvh" background="gray.100">
      <Container
        maxW="container.sm"
        as={Flex}
        direction="column"
        justify="center"
        height="full"
      >
        <Card width="full">
          <CardBody>
            <CreateUserForm onSubmit={createUser} />
          </CardBody>
        </Card>
      </Container>
    </Box>
  )
}
