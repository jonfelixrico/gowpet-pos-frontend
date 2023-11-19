import LogoutButton from '@/components/main-layout/LogoutButton'
import MainLayout from '@/components/main-layout/MainLayout'
import RouteLinks from '@/components/main-layout/RouteLinks'
import { Container, Flex, Spacer } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function PanelLayout({ children }: { children: ReactNode }) {
  const drawer = (
    <Flex height="full" direction="column">
      <RouteLinks />
      <Spacer />

      <LogoutButton />
    </Flex>
  )

  return (
    <MainLayout height="100dvh" drawer={drawer}>
      <Container maxW="container.md" height="100%">
        {children}
      </Container>
    </MainLayout>
  )
}
