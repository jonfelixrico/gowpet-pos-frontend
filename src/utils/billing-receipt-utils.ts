'use client'

import { SavedBilling } from '@/types/SavedBilling'
import EscPosEncoder from 'esc-pos-encoder'
import { sendToThermalPrinter } from './thermal-printer-bt-utils'

function encodeReceiptContent({ items, serialNo }: SavedBilling) {
  const encoder = new EscPosEncoder().initialize()

  encoder.line(`Receipt no. ${serialNo}`)

  for (const { catalogItem, price, quantity } of items) {
    encoder.line(
      `${catalogItem.name} - ${price} x ${quantity} = ${price * quantity}`
    )
  }

  return encoder.encode()
}

export async function printReceiptViaThermalPrinter(billing: SavedBilling) {
  const content = encodeReceiptContent(billing)
  await sendToThermalPrinter(content)
}
