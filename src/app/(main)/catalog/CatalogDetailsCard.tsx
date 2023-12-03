import { CatalogItem } from '@/types/CatalogItem'
import { Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react'

export default function CatalogDetailsCard({
  catalogItem,
}: {
  catalogItem: CatalogItem
}) {
  const { name, price } = catalogItem
  return (
    <Card>
      <CardBody>
        <Flex direction="column" gap={2}>
          <Flex gap={2}>
            <Heading size="sx">Name:</Heading>
            <Text data-cy="name">{name}</Text>
          </Flex>

          <Flex gap={2}>
            <Heading size="sx" data-cy="price">
              Price:
            </Heading>
            <Text data-cy="price">{price}</Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}
