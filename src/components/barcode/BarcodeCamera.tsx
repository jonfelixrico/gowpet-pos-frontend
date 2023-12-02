import { useMemo, useRef, useState } from 'react'
import Webcam, { WebcamProps } from 'react-webcam'
import { useInterval, useMeasure } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'
import { Box } from '@chakra-ui/react'

type BaseBarcodeCameraProps = Partial<WebcamProps> & {
  onDetect: (value: DetectedBarcode[]) => void
  onError?: (err: unknown) => void
}

function BaseBarcodeCamera({
  onDetect,
  onError = () => {},
  ...webcamProps
}: BaseBarcodeCameraProps) {
  const webcamRef = useRef<Webcam | null>(null)

  const barcodeDetector = useMemo(
    () =>
      new BarcodeDetector({
        formats: ['qr_code', 'upc_a', 'upc_e'],
      }),
    []
  )

  useInterval(async () => {
    if (!webcamRef.current) {
      return
    }

    const imageUrl = webcamRef.current.getScreenshot()
    if (!imageUrl) {
      return
    }

    const image = new Image()
    image.src = imageUrl

    try {
      const results = await barcodeDetector.detect(image)
      onDetect(results)
    } catch (e) {
      onError(e)
    }
  }, 1000 / 3)

  return (
    <Webcam {...webcamProps} ref={webcamRef} screenshotFormat="image/jpeg" />
  )
}

export type BarcodeCameraProps = {
  onDetect: (value: string) => void
  onError?: (err: unknown) => void
} & Pick<WebcamProps, 'videoConstraints' | 'style' | 'className'>

export default function BarcodeCamera({
  onDetect,
  ...props
}: BarcodeCameraProps) {
  const [boxRef, { width, height }] = useMeasure<HTMLDivElement>()
  const [detectedBarcodes, setDetectedBarcodes] = useState<DetectedBarcode[]>(
    []
  )

  function handleDetect(barcodes: DetectedBarcode[]) {
    setDetectedBarcodes(barcodes)
    if (barcodes.length) {
      onDetect(barcodes[0].rawValue)
    }
  }

  return (
    <Box
      ref={boxRef}
      width="fit-content"
      height="fit-content"
      position="relative"
    >
      <Box position="absolute" height="full" width="full">
        Test
      </Box>
      <BaseBarcodeCamera {...props} onDetect={handleDetect} />
    </Box>
  )
}
