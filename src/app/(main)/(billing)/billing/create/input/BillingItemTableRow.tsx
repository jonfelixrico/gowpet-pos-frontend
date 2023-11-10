'use client'

import { BillingItem } from '@/types/Billing'
import { Box, Button, Flex, IconButton, Td, Text, Tr } from '@chakra-ui/react'
import { MdAdd, MdRemove } from 'react-icons/md'

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
}: BillingItemTableRow) {
  return (
    <Tr>
      <Td data-cy="name">{name}</Td>

      <Td data-cy="price">{price}</Td>

      <Td>
        <QuantitySection
          onDecrement={() => onQuantityChange(quantity - 1)}
          onIncrement={() => onQuantityChange(quantity + 1)}
          quantity={quantity}
        />
      </Td>

      <Td data-cy="amount">{price * quantity}</Td>

      <Td>
        <Flex gap={3}>
          <Button size="xs" onClick={onEdit}>
            Edit Quantity
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

function QuantitySection({
  onDecrement,
  onIncrement,
  quantity,
}: {
  onIncrement: () => void
  onDecrement: () => void
  quantity: number
}) {
  return (
    <Flex direction="column" align="center">
      <Flex gap={3} align="center">
        <IconButton
          data-cy="decrement"
          isRound
          size="xs"
          aria-label="subtract"
          onClick={onDecrement}
          isDisabled={quantity === 1}
        >
          <MdRemove />
        </IconButton>

        <Text data-cy="quantity" fontSize="xl" fontWeight="medium">
          {quantity}
        </Text>

        <IconButton
          data-cy="increment"
          isRound
          size="xs"
          aria-label="add"
          onClick={onIncrement}
        >
          <MdAdd />
        </IconButton>
      </Flex>

      <Text fontSize="xs">{quantity === 1 ? 'unit' : 'units'}</Text>
    </Flex>
  )
}
