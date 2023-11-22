'use client'

import { SavedBilling, SavedBillingItem } from '@/types/SavedBilling'
import { Br, Printer, Text, render, Cut, QRCode } from 'react-thermal-printer'

function ReceiptItem({ catalogItem, price, quantity }: SavedBillingItem) {
  return (
    <>
      <Text bold>{catalogItem.name}</Text>
      <Text>{`PHP ${price} x ${quantity} = PHP ${price * quantity}`}</Text>
    </>
  )
}

function Receipt({ serialNo, items }: SavedBilling) {
  return (
    <Printer type="epson" width={56} initialize={true}>
      <Text align="center" size={{ height: 3, width: 2 }}>
        Business, Inc.
      </Text>

      <Br />

      <Text align="center">1234 567 891</Text>
      <Text align="center">
        Jose P Laurel Sr, San Miguel, Manila, Metro Manila
      </Text>

      <Br />

      {items.map(ReceiptItem)}

      <Br />

      <Text bold>
        TOTAL: PHP{' '}
        {items.reduce((acc, val) => acc + val.price * val.quantity, 0)}
      </Text>
      <Text bold>
        # OF ITEMS PURCHASED:{' '}
        {items.reduce((acc, { quantity }) => acc + quantity, 0)}
      </Text>

      <Br />

      <Text>BILLING # {String(serialNo).padStart(4)}</Text>

      <Br />

      <Text align="center">Like us on Facebook! Scan the QR code below</Text>
      <QRCode align="center" correction="H" content="https://google.com" />

      <Text align="center">Thank you and please come again!</Text>

      <Br />

      <Text align="center">{new Date().toLocaleString()}</Text>
      <Text align="center">CUSTOMER COPY</Text>
      <Cut lineFeeds={3} />
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
