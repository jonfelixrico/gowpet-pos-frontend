'use client'

import { BillingItem } from '@/types/Billing'
import { Button, Flex, Td, Tr } from '@chakra-ui/react'
import BillingItemQuantity from './BillingItemQuantity'
import { DataAttributes } from '@/types/DataAttributes'

interface BillingItemTableRow {
  item: BillingItem
  onQuantityChange?: (number: number) => void
  onDelete?: () => void
  onEdit?: () => void
}

export default function BillingItemTableRow({
  item: { name, price, quantity },
  onQuantityChange = () => {},
  onDelete = () => {},
  onEdit = () => {},
  ...dataAttrs
}: BillingItemTableRow & DataAttributes) {
  return (
    <Tr {...dataAttrs}>
      <Td data-cy="name">{name}</Td>

      <Td data-cy="price">{price}</Td>

      <Td>
        <BillingItemQuantity
          onDecrement={() => onQuantityChange(quantity - 1)}
          onIncrement={() => onQuantityChange(quantity + 1)}
          quantity={quantity}
        />
      </Td>

      <Td data-cy="amount">{price * quantity}</Td>

      <Td>
        <Flex gap={3} direction="column">
          <Button size="xs" onClick={onEdit} data-cy="edit">
            Edit
          </Button>

          <Button
            data-cy="delete"
            size="xs"
            onClick={onDelete}
            colorScheme="red"
          >
            Delete
          </Button>
        </Flex>
      </Td>
    </Tr>
  )
}
