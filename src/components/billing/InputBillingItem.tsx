'use client'

import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

interface InputBillingItemProps {
  catalogId: string
  name: string
  price: number
  quantity: number
  onQuantityChange: (number: number) => void
  onDelete: () => void
}

export default function InputBillingItem(props: InputBillingItemProps) {
  return (
    // TODO stub for now
    <Box>
      {props.name}
      {props.price}
      <NumberInput
        value={props.quantity}
        onChange={(_, val) => props.onQuantityChange(val)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  )
}
