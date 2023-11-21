import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <Container maxW="container.md" padding={2}>
      {children}
    </Container>
  )
}
