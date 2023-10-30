import { Card, CardBody, Flex, Heading } from '@chakra-ui/react'
import CatalogCreateForm from './CatalogCreateForm'
import Link from 'next/link'
import BackIconButton from '../BackIconButton'

export default function CatalogCreate() {
  return (
    <Flex height="full" width="full" direction="column" gap="5">
      <Flex gap="5" align="center">
        <Link href="/catalog">
          <BackIconButton />
        </Link>
        <Heading>Create Item</Heading>
      </Flex>
      <Card>
        <CardBody>
          <CatalogCreateForm />
        </CardBody>
      </Card>
    </Flex>
  )
}
