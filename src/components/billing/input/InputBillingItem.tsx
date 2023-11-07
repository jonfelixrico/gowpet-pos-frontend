'use client'

import {
  Box,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'

interface InputBillingItemProps {
  item: {
    catalogId: string
    name: string
    price: number
    quantity: number
  }
  onQuantityChange: (number: number) => void
  onDelete: () => void
}

export default function InputBillingItem({
  item,
  onQuantityChange,
  onDelete,
}: InputBillingItemProps) {
  return (
    // TODO stub for now
    <Box>
      <Text data-cy="name">{item.name}</Text>
      <Text data-cy="price">{item.price}</Text>
      <NumberInput
        value={item.quantity}
        onChange={(_, val) => onQuantityChange(val)}
      >
        <NumberInputField data-cy="quantity" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button onClick={onDelete}>Delete</Button>
    </Box>
  )
}
