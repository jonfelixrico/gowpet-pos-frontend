import { Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function BillingListLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Flex direction="column">
      <Flex>
        <Link href="/billing/create">
          <Button>Create</Button>
        </Link>
      </Flex>

      <Flex flex={1}>{children}</Flex>
    </Flex>
  )
}
