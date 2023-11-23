import { Card, CardBody, Container, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import SettingsTabs from './SettingsTabs'

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
      <SettingsTabs />
      <Card flex={1}>
        <CardBody>{children}</CardBody>
      </Card>
    </Container>
  )
}
