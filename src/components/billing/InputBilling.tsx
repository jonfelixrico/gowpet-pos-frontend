import { Flex } from '@chakra-ui/react'
import InputBillingItem from './InputBillingItem'
import { produce } from 'immer'

interface InputBilling {
  items: {
    catalogId: string
    name: string
    price: number
    quantity: number
  }[]
}

export interface InputBillingProps {
  billing: InputBilling
  onChange: (value: InputBilling) => void
}

export default function InputBilling({ billing, onChange }: InputBillingProps) {
  function onItemDelete(catalogId: string) {
    const updatedBilling = produce(billing, ({ items }) => {
      const idx = items.findIndex((item) => item.catalogId === catalogId)
      items.splice(idx, 1)
    })

    onChange(updatedBilling)
  }

  function onItemQuantityChange(catalogId: string, newQuantity: number) {
    const updatedBilling = produce(billing, ({ items }) => {
      const item = items.find((inArr) => inArr.catalogId === catalogId)
      if (!item) {
        throw new Error('item not found')
      }

      item.quantity = newQuantity
    })

    onChange(updatedBilling)
  }

  return (
    <Flex direction="column">
      {billing.items.map((item) => (
        <InputBillingItem
          key={item.catalogId}
          item={item}
          onDelete={() => onItemDelete(item.catalogId)}
          onQuantityChange={(val) => onItemQuantityChange(item.catalogId, val)}
        />
      ))}
    </Flex>
  )
}
