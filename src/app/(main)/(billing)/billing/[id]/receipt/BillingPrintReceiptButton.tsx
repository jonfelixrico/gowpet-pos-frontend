/* eslint-disable jsx-a11y/alt-text */
'use client'
import { useOffscreenContainer } from '@/contexts/OffscreenContainerContext'
import useDetectClient from '@/hooks/detect-client'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import { SavedBilling } from '@/types/SavedBilling'
import { sendToThermalPrinter } from '@/utils/thermal-printer-bt-utils'
import { Button, ButtonProps } from '@chakra-ui/react'
import { RefObject, useRef, useState } from 'react'
import BillingReceipt from './BillingReceipt'
import { createPortal } from 'react-dom'
import { Cut, Image, Printer, render } from 'react-thermal-printer'
import { toCanvas } from 'html-to-image'
import { cropY } from '@/utils/canvas-utils'

export type BillingPrintReceiptButtonProps = {
  billing: SavedBilling
  receiptSettings?: ReceiptSettings
} & ButtonProps

async function encodeForThermalReceipt(
  ref: RefObject<HTMLElement>,
  width: number
) {
  if (!ref.current) {
    throw new Error('ref not found')
  }

  const receiptAsImage = await toCanvas(ref.current, {
    quality: 0.25,
    pixelRatio: 2,
  })

  const encodeAndPrint = async (toPrint: HTMLCanvasElement) => {
    const encoded = await render(
      <Printer type="epson" width={width} initialize>
        <Image src={toPrint.toDataURL()} align="center" />
      </Printer>
    )

    await sendToThermalPrinter(encoded)
  }

  const LENGTH_PER_PRINT = 200
  const imageLength = receiptAsImage.height
  let index = 0

  while (index + LENGTH_PER_PRINT < imageLength) {
    await encodeAndPrint(cropY(receiptAsImage, index, index + LENGTH_PER_PRINT))
    index += LENGTH_PER_PRINT
  }

  if (index < imageLength) {
    await encodeAndPrint(cropY(receiptAsImage, index, imageLength))
  }

  await sendToThermalPrinter(
    await render(
      <Printer type="epson" width={width} initialize>
        <Cut lineFeeds={3} />
      </Printer>
    )
  )
}

export default function BillingPrintReceiptButton({
  billing,
  receiptSettings,
  ...buttonProps
}: BillingPrintReceiptButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const portalTarget = useOffscreenContainer()
  const isClient = useDetectClient()
  const receiptRef = useRef<HTMLDivElement>(null)

  async function printReceipt() {
    if (!receiptSettings) {
      // This shouldn't be running if !receiptSettings. The button should've been disabled
      return
    }

    try {
      setIsLoading(true)
      await encodeForThermalReceipt(receiptRef, 48)
    } catch (e) {
      console.error('Error encountered while printing the receipt', e)
    } finally {
      setIsLoading(false)
    }
  }

  const button = (
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

  /*
    Ideally, we'd use the If component here to conditionally render the receipt portal.
    However, Next.js throws "createPortal was called on the server. ..." if that approach
    was used instead of a normal `if` statement.
  */
  if (isClient && !!portalTarget?.current && !!receiptSettings) {
    return (
      <>
        {button}
        {createPortal(
          <BillingReceipt
            billing={billing}
            settings={receiptSettings as ReceiptSettings}
            width={48}
            ref={receiptRef}
          />,
          portalTarget?.current as HTMLDivElement
        )}
      </>
    )
  }

  return button
}