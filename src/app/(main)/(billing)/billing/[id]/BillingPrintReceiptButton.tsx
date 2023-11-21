'use client'
import { sendToThermalPrinter } from '@/utils/thermal-printer-bt-utils'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useState } from 'react'

export default function BillingPrintReceiptButton({
  encodedReceipt,
  ...buttonProps
}: {
  encodedReceipt: string
} & ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function printReceipt() {
    try {
      setIsLoading(true)
      const encoder = new TextEncoder()
      await sendToThermalPrinter(encoder.encode(encodedReceipt))
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
