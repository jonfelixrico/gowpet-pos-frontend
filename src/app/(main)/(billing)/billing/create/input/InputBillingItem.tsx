'use client'

import { Billing } from '@/types/Billing'
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react'
import { MdAdd, MdRemove } from 'react-icons/md'

interface InputBillingItemProps {
  item: Billing['items'][number]
  onQuantityChange: (number: number) => void
  onDelete: () => void
}

export default function InputBillingItem({
  item,
  onQuantityChange,
  onDelete,
}: InputBillingItemProps) {
  function onSubtract() {
    if (item.quantity === 1) {
      onDelete()
      return
    }

    onQuantityChange(item.quantity - 1)
  }

  return (
    // TODO stub for now
    <Flex direction="column" gap={3}>
      <Flex gap={5} align="start">
        <Box flex={1}>
          <Text data-cy="name">{item.name}</Text>
          <Text data-cy="price" fontSize="small">
            {item.price} per unit
          </Text>
          <Text data-cy="amount" fontSize="small">
            {item.price * item.quantity} for {item.quantity} units
          </Text>
        </Box>

        <Flex gap={3} align="center">
          <IconButton
            data-cy="decrement"
            isRound
            size="xs"
            aria-label="subtract"
            onClick={onSubtract}
          >
            <MdRemove />
          </IconButton>
          <Text data-cy="quantity" fontSize="xl">
            {item.quantity}
          </Text>
          <IconButton
            data-cy="increment"
            isRound
            size="xs"
            aria-label="add"
            onClick={() => onQuantityChange(item.quantity + 1)}
          >
            <MdAdd />
          </IconButton>
        </Flex>
      </Flex>

      <Flex gap={3}>
        {/* TODO add trigger */}
        <Button size="xs">Edit Quantity</Button>
        <Button size="xs" onClick={onDelete}>
          Delete
        </Button>
      </Flex>
    </Flex>
  )
}
