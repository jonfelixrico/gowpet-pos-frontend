import DrawerRoutes from '@/components/main-layout/DrawerRoutes'
import MainLayout from '@/components/main-layout/MainLayout'
import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout height="100dvh" drawer={<DrawerRoutes />}>
      <Container maxW="container.md" height="100%">
        {children}
      </Container>
    </MainLayout>
  )
}
