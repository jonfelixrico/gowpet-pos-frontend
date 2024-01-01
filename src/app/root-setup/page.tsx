import { Box, Card, CardBody, Container, Flex } from '@chakra-ui/react'
import { RedirectType, permanentRedirect, redirect } from 'next/navigation'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { Credentials } from '@/types/login-types'
import { revalidateTag } from 'next/cache'
import CreateRootUserForm from '@/components/user/CreateRootUserForm'

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
    /*
     * We're using permanent redirect since root setup will only be done once per
     * environment.
     *
     * Once the root user has been set up, this page will never be seen again.
     */
    permanentRedirect('/', RedirectType.replace)
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
    <Box
      width="100dvw"
      height="100dvh"
      background="gray.100"
      data-page="root-setup"
    >
      <Container
        maxW="container.sm"
        as={Flex}
        direction="column"
        justify="center"
        height="full"
      >
        <Card width="full">
          <CardBody>
            <CreateRootUserForm onSubmit={createUser} />
          </CardBody>
        </Card>
      </Container>
    </Box>
  )
}
