import { Button, Divider, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function CatalogListLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Flex direction="column" gap="2" as="main" height="100%">
      <Flex justify="end">
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
