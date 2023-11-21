'use client'
import { SavedBilling } from '@/types/SavedBilling'
import { encodeForThermalReceipt } from '@/utils/billing-receipt-utils'
import { sendToThermalPrinter } from '@/utils/thermal-printer-bt-utils'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useState } from 'react'

export default function BillingPrintReceiptButton({
  billing,
  ...buttonProps
}: {
  billing: SavedBilling
} & ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function printReceipt() {
    try {
      setIsLoading(true)
      const encoded = encodeForThermalReceipt(billing)
      await sendToThermalPrinter(encoded)
    } catch (e) {
      console.error('Error encountered while printing the receipt', e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button {...buttonProps} onClick={printReceipt} isLoading={isLoading}>
      Print Receipt
    </Button>
  )
}
