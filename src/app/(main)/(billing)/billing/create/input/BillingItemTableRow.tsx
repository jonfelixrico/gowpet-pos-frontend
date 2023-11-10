'use client'

import { BillingItem } from '@/types/Billing'
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react'
import { MdAdd, MdRemove } from 'react-icons/md'

interface BillingItemTableRow {
  item: BillingItem
  onQuantityChange?: (number: number) => void
  onDelete?: () => void
  onEdit?: () => void
}

export default function BillingItemTableRow({
  item,
  onQuantityChange = () => {},
  onDelete = () => {},
  onEdit = () => {},
}: BillingItemTableRow) {
  return (
    <Flex direction="column" gap={3}>
      <Flex gap={5} align="start">
        <Box flex={1}>
          <Text data-cy="name" marginBottom={2}>
            {item.name}
          </Text>
          <Text data-cy="price" fontSize="small">
            {item.price} per unit
          </Text>
          <Text data-cy="amount" fontSize="small">
            Total of {item.price * item.quantity}
          </Text>
        </Box>

        <QuantitySection
          onDecrement={() => onQuantityChange(item.quantity - 1)}
          onIncrement={() => onQuantityChange(item.quantity + 1)}
          quantity={item.quantity}
        />
      </Flex>

      <Flex gap={3}>
        <Button size="xs" onClick={onEdit}>
          Edit Quantity
        </Button>
        <Button data-cy="delete" size="xs" onClick={onDelete} colorScheme="red">
          Delete
        </Button>
      </Flex>
    </Flex>
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