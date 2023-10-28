import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function PanelLayout({ children }: { children: ReactNode }) {
  return <Container maxW="container.md">{children}</Container>
}
