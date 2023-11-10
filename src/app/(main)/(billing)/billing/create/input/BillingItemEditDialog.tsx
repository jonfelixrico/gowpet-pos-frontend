import Dialog from '@/components/common/Dialog'
import { BillingItem } from '@/types/Billing'
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function BillingItemEditDialog({
  isOpen,
  onOk,
  onDismiss,
  item,
}: {
  isOpen: boolean
  onOk: (item: BillingItem) => void
  onDismiss: () => void
  item?: BillingItem
}) {
  const [quantity, setQuantity] = useState(item?.quantity ?? 0)
  function emitValue() {
    if (!item) {
      return
    }

    onOk({
      ...item,
      quantity,
    })
  }

  return (
    <Dialog
      isOpen={isOpen}
      onOk={emitValue}
      onCancel={onDismiss}
      onDismiss={onDismiss}
    >
      <NumberInput
        value={quantity}
        onChange={(inputValue) => setQuantity(parseInt(inputValue))}
        min={1}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Dialog>
  )
}
