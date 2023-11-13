import { Button, Divider, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function BillingListLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Flex direction="column" gap={2}>
      <Flex justify="end">
        <Link href="/billing/create">
          <Button colorScheme="blue">Create</Button>
        </Link>
      </Flex>

      <Divider />

      <Flex flex={1}>{children}</Flex>
    </Flex>
  )
}
