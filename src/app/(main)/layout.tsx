import LogoutButton from '@/components/main-layout/LogoutButton'
import MainLayout from '@/components/main-layout/MainLayout'
import RouteLinks from '@/components/main-layout/RouteLinks'
import { Container, Flex, Spacer } from '@chakra-ui/react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default function PanelLayout({ children }: { children: ReactNode }) {
  function logOut() {
    'use server'
    cookies().delete('auth')
    redirect('/login')
  }

  const drawer = (
    <Flex height="full" direction="column">
      <RouteLinks />
      <Spacer />

      <LogoutButton onLogOutConfirm={logOut} />
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
