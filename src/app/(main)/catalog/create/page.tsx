import { Card, CardBody, Divider, Flex, Heading } from '@chakra-ui/react'
import CatalogCreateForm from './CatalogCreateForm'

export default function CatalogCreate() {
  return (
    <Flex height="full" width="full" direction="column" gap={2}>
      <Heading>Create Item</Heading>
      <Card>
        <CardBody>
          <CatalogCreateForm />
        </CardBody>
      </Card>
    </Flex>
  )
}
