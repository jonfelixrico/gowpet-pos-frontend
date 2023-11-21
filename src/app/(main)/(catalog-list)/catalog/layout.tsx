import {
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Spacer,
} from '@chakra-ui/react'
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
    <Container
      maxW="container.md"
      height="full"
      padding={2}
      as={Flex}
      direction="column"
      gap={2}
    >
      <Flex gap={2} align="center">
        <Link href="/catalog/create">
          <Button colorScheme="blue" data-cy="create">
            Create
          </Button>
        </Link>

        <Spacer />

        {toolbar}
      </Flex>

      <Card flex={1}>
        <CardBody padding={2}>{children}</CardBody>
      </Card>
    </Container>
  )
}
