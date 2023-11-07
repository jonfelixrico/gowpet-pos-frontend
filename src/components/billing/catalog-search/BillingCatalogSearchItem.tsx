'use client'

import { Box, Button, Text } from '@chakra-ui/react'

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
    <Box>
      <Text>{catalogItem.name}</Text>
      <Text>{catalogItem.price}</Text>
      <Button isDisabled={!canAdd} onClick={onAdd}>
        Add
      </Button>
    </Box>
  )
}
