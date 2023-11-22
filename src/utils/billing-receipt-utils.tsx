'use client'

import { SavedBilling } from '@/types/SavedBilling'
import { Br, Line, Printer, Text, Row, render } from 'react-thermal-printer'

function Receipt({ billing: { items, serialNo } }: { billing: SavedBilling }) {
  return (
    <Printer type="epson" width={56} characterSet="pc437_usa">
      <Text>{serialNo}</Text>
      <Br />
      <Line />
      {items.map(({ catalogItem, price, quantity }, index) => (
        <Row
          key={index}
          left={catalogItem.name}
          right={String(price * quantity)}
        />
      ))}
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

export function encodeForThermalReceipt(billing: SavedBilling) {
  return render(<Receipt billing={billing} />)
}
