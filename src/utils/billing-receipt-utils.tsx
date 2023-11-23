'use client'

import { ReceiptSettings } from '@/types/ReceiptSetings'
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

function Receipt({ serialNo, items }: SavedBilling, settings: ReceiptSettings) {
  return (
    <Printer type="epson" width={56} initialize={true}>
      <Text align="center" size={{ height: 3, width: 2 }}>
        {settings.header}
      </Text>

      <Br />

      <Text align="center">{settings.contactNo}</Text>
      <Text align="center">{settings.address}</Text>

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

      <Text align="center">{settings.snsLink}</Text>
      <QRCode align="center" correction="H" content={settings.snsLink} />

      <Text align="center">Thank you and please come again!</Text>

      <Br />

      <Text align="center">{new Date().toLocaleString()}</Text>
      <Text align="center">CUSTOMER COPY</Text>
      <Cut lineFeeds={3} />
    </Printer>
  )
}

export async function encodeForThermalReceipt(
  billing: SavedBilling,
  settings: ReceiptSettings
) {
  /*
   * If we call receipt as <Receipt ... /> it won't work
   * I guess that only works for ReactDOM components?
   */
  return await render(Receipt(billing, settings))
}
