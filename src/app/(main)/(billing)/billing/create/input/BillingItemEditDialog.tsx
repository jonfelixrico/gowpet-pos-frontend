import Dialog from '@/components/common/Dialog'
import { BillingItem } from '@/types/Billing'
import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
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
      ok={{
        label: 'Save Changes',
        colorScheme: 'blue',
      }}
      cancel={{
        label: 'Cancel Changes',
        variant: 'ghost',
      }}
      header="Edit Item"
    >
      <Flex direction="column" gap="2">
        <Text fontWeight="bold">Quantity</Text>
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
      </Flex>
    </Dialog>
  )
}
