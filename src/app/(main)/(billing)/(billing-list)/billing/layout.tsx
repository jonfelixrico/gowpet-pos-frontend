import { Button, Container, Divider, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function BillingListLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Container
      maxW="container.md"
      as={Flex}
      direction="column"
      gap={2}
      height="full"
      padding={2}
    >
      <Flex justify="end">
        <Link href="/billing/create">
          <Button colorScheme="blue">Create</Button>
        </Link>
      </Flex>

      <Divider />

      <Flex flex={1}>{children}</Flex>
    </Container>
  )
}
