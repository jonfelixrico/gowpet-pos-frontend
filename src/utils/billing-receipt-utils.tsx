'use client'

import { SavedBilling, SavedBillingItem } from '@/types/SavedBilling'
import { Br, Line, Printer, Text, Row, render } from 'react-thermal-printer'

function ReceiptItem({ catalogItem, price, quantity }: SavedBillingItem) {
  return <Row left={catalogItem.name} right={String(price * quantity)} />
}

function Receipt({ serialNo, items }: SavedBilling) {
  return (
    <Printer type="epson" width={56} initialize={true}>
      <Text>{serialNo}</Text>
      <Br />
      <Line />
      {items.map(ReceiptItem)}
      <Line />
      <Br />
      <Row
        left="Total"
        right={String(
          items.reduce((acc, val) => acc + val.price * val.quantity, 0)
        )}
      />
    </Printer>
  )
}

export async function encodeForThermalReceipt(billing: SavedBilling) {
  /*
   * If we call receipt as <Receipt ... /> it won't work
   * I guess that only works for ReactDOM components?
   */
  return await render(Receipt(billing))
}
