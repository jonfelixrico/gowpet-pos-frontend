import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function BillingLayout({ children }: { children: ReactNode }) {
  return (
    <Container height="full" gap={2} maxW="container.md" padding={2}>
      {children}
    </Container>
  )
}
