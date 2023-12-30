import SettingsTabs from '@/components/settings/SettingsTabs'
import { Box, Card, CardBody, Container, Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Container maxW="container.lg" height="full" as={Flex} gap={2} padding={2}>
      <Flex direction="column" gap={2}>
        <SettingsTabs />
      </Flex>

      <Card flex={1}>
        <CardBody>{children}</CardBody>
      </Card>
    </Container>
  )
}
