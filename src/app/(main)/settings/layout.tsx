import { Card, CardBody, Container, Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Container
      maxW="container.md"
      height="full"
      as={Flex}
      direction="column"
      padding={2}
      gap={2}
    >
      <Text fontSize="2xl" fontWeight="bold">
        Billing Settings
      </Text>
      <Card flex={1}>
        <CardBody>{children}</CardBody>
      </Card>
    </Container>
  )
}
