import { Box, Card, CardBody, Center, Container } from '@chakra-ui/react'
import { RedirectType, redirect } from 'next/navigation'
import { apiFetchData } from '@/server-utils/resource-api-util'

async function shouldProceedWithRootSetup() {
  try {
    const { data } = await apiFetchData<{ hasRootBeenSetUp: boolean }>(
      '/user/root',
      {
        next: {
          tags: ['root-setup'],
        },
      }
    )

    return !data.hasRootBeenSetUp
  } catch (e) {
    console.error('Error encountered while checking if root setup is ready', e)
    return false
  }
}

export default async function RootSetup() {
  if (!(await shouldProceedWithRootSetup())) {
    redirect('/', RedirectType.replace)
  }

  return (
    <Box width="100dvw" height="100dvh" background="gray.100">
      <Container maxW="container.sm" as={Center}>
        <Card width="full">
          <CardBody>{/* TODO form */}</CardBody>
        </Card>
      </Container>
    </Box>
  )
}
