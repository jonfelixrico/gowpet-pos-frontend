import { Box, Button, Text } from '@chakra-ui/react'

export interface BillingCatalogItemProps {
  catalogItem: {
    name: string
    price: number
  }

  canAdd: boolean
  onAdd: () => void
}

export default function BillingCatalogItem({
  catalogItem,
  canAdd,
  onAdd,
}: BillingCatalogItemProps) {
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
