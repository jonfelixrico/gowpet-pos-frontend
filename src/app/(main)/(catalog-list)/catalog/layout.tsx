import { Button, Divider, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function CatalogListLayout({
  children,
  toolbar,
}: {
  children: ReactNode
  toolbar: ReactNode
}) {
  return (
    <Flex direction="column" gap="2" as="main" height="100%">
      <Flex gap={2} justify="space-between" align="center">
        <Flex flex={1}>{toolbar}</Flex>

        <Link href="/catalog/create">
          <Button colorScheme="blue" data-cy="create">
            Create
          </Button>
        </Link>
      </Flex>

      <Divider />

      <Flex flex={1}>{children}</Flex>
    </Flex>
  )
}
