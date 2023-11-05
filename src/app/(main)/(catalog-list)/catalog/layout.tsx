import { Button, Divider, Flex, Spacer } from '@chakra-ui/react'
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
      <Flex gap={2} align="center">
        <Link href="/catalog/create">
          <Button colorScheme="blue" data-cy="create">
            Create
          </Button>
        </Link>

        <Spacer />

        {toolbar}
      </Flex>

      <Flex flex={1}>{children}</Flex>
    </Flex>
  )
}
