import { useMemo, useRef } from 'react'
import Webcam, { WebcamProps } from 'react-webcam'
import { useInterval } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'
import { Box } from '@chakra-ui/react'

type BaseBarcodeCameraProps = WebcamProps & {
  onDetect: (value: DetectedBarcode[]) => void
  onError: (e: unknown) => void
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
      if (results.length === 0) {
        return
      }

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
  onError = () => {},
  ...props
}: BarcodeCameraProps) {
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
      if (results.length === 0) {
        return
      }

      const { rawValue } = results[0]
      onDetect(rawValue)
    } catch (e) {
      console.warn('Error detected while trying to get barcode', e)
      onError(e)
    }
  }, 1000 / 3)

  return (
    <Box height="fit-content" width="fit-content">
      <Webcam {...props} ref={webcamRef} screenshotFormat="image/jpeg" />
    </Box>
  )
}
