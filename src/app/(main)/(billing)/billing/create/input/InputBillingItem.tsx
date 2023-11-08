'use client'

import { Billing } from '@/types/Billing'
import {
  Box,
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'

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
  return (
    // TODO stub for now
    <Box>
      <Text data-cy="name">{item.name}</Text>
      <Text data-cy="price" fontSize="small">
        {item.price} per unit
      </Text>
      <Text data-cy="amount" fontSize="small">
        {item.price * item.quantity} for {item.quantity} units
      </Text>
      <Flex gap={2}>
        <NumberInput
          value={item.quantity}
          onChange={(_, val) => onQuantityChange(val)}
        >
          <NumberInputField data-cy="quantity" />
          <NumberInputStepper>
            <NumberIncrementStepper data-cy="increment" />
            <NumberDecrementStepper data-cy="decrement" />
          </NumberInputStepper>
        </NumberInput>

        <Button onClick={onDelete} data-cy="delete">
          Delete
        </Button>
      </Flex>
    </Box>
  )
}
