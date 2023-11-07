'use client'

import {
  Box,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
      {item.name}
      {item.price}
      <NumberInput
        value={item.quantity}
        onChange={(_, val) => onQuantityChange(val)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button onClick={onDelete}>Delete</Button>
    </Box>
  )
}
