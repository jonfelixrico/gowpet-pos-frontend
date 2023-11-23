import { Card, CardBody, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Flex height="full" gap={2} direction="column">
      <Card flex={1}>
        <CardBody>{children}</CardBody>
      </Card>
    </Flex>
  )
}
