'use client'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

export interface BillingCatalogSearchItemProps {
  catalogItem: {
    name: string
    price: number
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
    <Flex justify="space-between" gap={2}>
      <Box>
        <Text>{catalogItem.name}</Text>
        <Text fontSize="xs">{catalogItem.price}</Text>
      </Box>

      <Button isDisabled={!canAdd} onClick={onAdd}>
        Add
      </Button>
    </Flex>
  )
}
