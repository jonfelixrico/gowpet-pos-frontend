'use client'

import { SavedBilling } from '@/types/SavedBilling'
import EscPosEncoder from 'esc-pos-encoder'

export function encodeForThermalReceipt({ items, serialNo }: SavedBilling) {
  const encoder = new EscPosEncoder().initialize()

  encoder.line(`Receipt no. ${serialNo}`)

  for (const { catalogItem, price, quantity } of items) {
    encoder.line(
      `${catalogItem.name} - ${price} x ${quantity} = ${price * quantity}`
    )
  }

  return encoder.encode()
}
