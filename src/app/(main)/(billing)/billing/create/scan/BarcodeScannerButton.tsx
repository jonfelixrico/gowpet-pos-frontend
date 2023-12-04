import { Billing } from '@/types/Billing'
import { Button, ButtonProps } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

interface BillingStateProps {
  billing: Billing
  setBilling: Dispatch<SetStateAction<Billing>>
}

export default function BarcodeScannerButton({
  billing,
  setBilling,
  ...buttonProps
}: BillingStateProps & ButtonProps) {
  return (
    <>
      <Button {...buttonProps} size="sm">
        Barcode Scanner
      </Button>
    </>
  )
}
