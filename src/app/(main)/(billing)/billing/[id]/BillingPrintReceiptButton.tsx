'use client'

import { SavedBilling } from '@/types/SavedBilling'
import { printReceiptViaThermalPrinter } from '@/utils/billing-receipt-utils'
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
      await printReceiptViaThermalPrinter(billing)
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
