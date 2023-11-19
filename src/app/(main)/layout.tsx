import MainLayout from '@/components/main-layout/MainLayout'
import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <Container maxW="container.md" height="100dvh">
        {children}
      </Container>
    </MainLayout>
  )
}
