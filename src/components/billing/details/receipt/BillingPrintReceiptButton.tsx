/* eslint-disable jsx-a11y/alt-text */
'use client'
import { OffscreenContainerPortal } from '@/contexts/OffscreenContainerContext'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import { SavedBilling } from '@/types/SavedBilling'
import { sendToThermalPrinter } from '@/utils/thermal-printer-bt-utils'
import { Button, ButtonProps } from '@chakra-ui/react'
import { RefObject, useCallback, useRef, useState } from 'react'
import BillingReceipt from './BillingReceipt'
import { createPortal } from 'react-dom'
import { Cut, Image, Printer, render } from 'react-thermal-printer'
import { toCanvas } from 'html-to-image'
import { cropY } from '@/utils/canvas-utils'
import If from '@/components/common/If'

export type BillingPrintReceiptButtonProps = {
  billing: SavedBilling
  receiptSettings?: ReceiptSettings
} & ButtonProps

async function encodeForThermalReceipt(el: HTMLElement, width: number) {
  const receiptAsImage = await toCanvas(el, {
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

  /*
    We're doing all these because aside from getting the ref, we also want to know
    when the ref changed. The regular ref is non-reactive, so we had to be creative.
  */
  const [receiptRef, setReceiptRef] = useState<HTMLDivElement | null>(null)
  const refCb = useCallback(
    (node: HTMLDivElement) => {
      setReceiptRef(node ?? null)
    },
    [setReceiptRef]
  )

  async function printReceipt() {
    if (!receiptRef) {
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

  const isReceiptRendered = !!receiptRef

  return (
    <>
      <Button
        {...buttonProps}
        isDisabled={!receiptSettings || !isReceiptRendered}
        onClick={printReceipt}
        isLoading={isLoading && isReceiptRendered}
        data-cy="print-receipt"
      >
        Print Receipt
      </Button>

      <If condition={!!receiptSettings}>
        <OffscreenContainerPortal>
          <BillingReceipt
            billing={billing}
            settings={receiptSettings as ReceiptSettings}
            width={48}
            ref={refCb}
          />
        </OffscreenContainerPortal>
      </If>
    </>
  )
}
