'use client'

import { Flex } from '@chakra-ui/react'
import InputBillingItem from './InputBillingItem'
import { produce } from 'immer'
import { Billing } from '@/types/Billing'

export interface InputBillingProps {
  billing: Billing
  onChange: (value: Billing) => void
}

export default function InputBilling({ billing, onChange }: InputBillingProps) {
  function onItemDelete(catalogId: string) {
    const updatedBilling = produce(billing, ({ items }) => {
      const idx = items.findIndex((item) => item.catalogId === catalogId)

      // -1 means findIndex didn't find a match
      if (idx === -1) {
        /*
         * We're throwing an error here because we're expecting an item of `catalogId` to always
         * be found. If it's not found, then its a data error and shouldn't really be happening
         * from the start.
         */
        throw new Error('Data error: item not found')
      }

      items.splice(idx, 1)
    })

    onChange(updatedBilling)
  }

  function onItemQuantityChange(catalogId: string, newQuantity: number) {
    const updatedBilling = produce(billing, ({ items }) => {
      const item = items.find((inArr) => inArr.catalogId === catalogId)
      if (!item) {
        /*
         * We're throwing an error here because we're expecting an item of `catalogId` to always
         * be found. If it's not found, then its a data error and shouldn't really be happening
         * from the start.
         */
        throw new Error('Data error: item not found')
      }

      item.quantity = newQuantity
    })

    onChange(updatedBilling)
  }

  return (
    <Flex direction="column" gap={5}>
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
