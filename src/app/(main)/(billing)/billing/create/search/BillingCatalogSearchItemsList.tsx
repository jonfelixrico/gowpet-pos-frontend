import { Billing } from '@/types/Billing'
import { CatalogItem } from '@/types/CatalogItem'
import { DataAttributes } from '@/types/DataAttributes'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { produce } from 'immer'
import { Dispatch, SetStateAction } from 'react'

function BillingCatalogSearchItem({
  canAdd,
  onAdd,
  name,
  price,
  ...dataAttrs
}: {
  name: string
  price: number
  onAdd: () => void
  canAdd: boolean
} & DataAttributes) {
  return (
    <Flex {...dataAttrs} justify="space-between" gap={2}>
      <Box>
        <Text data-cy="name">{name}</Text>
        <Text data-cy="price" fontSize="xs">
          {price}
        </Text>
      </Box>

      <Button isDisabled={!canAdd} onClick={onAdd} data-cy="add">
        Add
      </Button>
    </Flex>
  )
}

export default function BillingCatalogSearchItemsList({
  billing,
  setBilling,
  itemsToSelectFrom,
}: {
  billing: Billing
  setBilling: Dispatch<SetStateAction<Billing>>
  itemsToSelectFrom: CatalogItem[]
}) {
  const alreadyAddedIds = new Set<string>(
    billing.items.map(({ catalogId }) => catalogId)
  )

  function addCatalogItemToBilling({ id, name, price }: CatalogItem) {
    setBilling((billing) =>
      produce(billing, (billing) => {
        billing.items.push({
          catalogId: id,
          name,
          price,
          quantity: 1,
        })
      })
    )
  }

  return itemsToSelectFrom.map((catalogItem) => {
    const { id, name, price } = catalogItem

    return (
      <BillingCatalogSearchItem
        name={name}
        price={price}
        onAdd={() => addCatalogItemToBilling(catalogItem)}
        key={id}
        canAdd={!alreadyAddedIds.has(id)}
        data-cy="catalog-item"
        data-catalog-item-id={id}
      />
    )
  })
}
