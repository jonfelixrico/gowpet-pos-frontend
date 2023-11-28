'use client'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import { SavedBilling } from '@/types/SavedBilling'
import { encodeForThermalReceipt } from '@/utils/billing-receipt-utils'
import { sendToThermalPrinter } from '@/utils/thermal-printer-bt-utils'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useState } from 'react'

export default function BillingPrintReceiptButton({
  billing,
  receiptSettings,
  ...buttonProps
}: {
  billing: SavedBilling
  receiptSettings?: ReceiptSettings
} & ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function printReceipt() {
    if (!receiptSettings) {
      // This shouldn't be running if !receiptSettings. The button should've been disabled
      return
    }

    try {
      setIsLoading(true)
      const encoded = await encodeForThermalReceipt(billing, receiptSettings)
      await sendToThermalPrinter(encoded)
    } catch (e) {
      console.error('Error encountered while printing the receipt', e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      {...buttonProps}
      isDisabled={!receiptSettings}
      onClick={printReceipt}
      isLoading={isLoading}
      data-cy="print-receipt"
    >
      Print Receipt
    </Button>
  )
}
