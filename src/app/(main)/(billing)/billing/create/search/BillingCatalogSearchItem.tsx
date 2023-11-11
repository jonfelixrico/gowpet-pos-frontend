'use client'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

export interface BillingCatalogSearchItemProps {
  catalogItem: {
    name: string
    price: number
    id: string
  }

  canAdd: boolean
  onAdd: () => void
}

export default function BillingCatalogSearchItem({
  catalogItem,
  canAdd,
  onAdd,
}: BillingCatalogSearchItemProps) {
  return (
    <Flex
      justify="space-between"
      gap={2}
      data-cy="item"
      data-item-id={catalogItem.id}
    >
      <Box>
        <Text>{catalogItem.name}</Text>
        <Text fontSize="xs">{catalogItem.price}</Text>
      </Box>

      <Button isDisabled={!canAdd} onClick={onAdd} data-cy="add">
        Add
      </Button>
    </Flex>
  )
}
