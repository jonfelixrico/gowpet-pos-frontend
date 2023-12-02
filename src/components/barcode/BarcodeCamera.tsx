import { useMemo, useRef } from 'react'
import Webcam, { WebcamProps } from 'react-webcam'
import { useInterval } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'

export default function BarcodeCamera({
  onDetect,
  onError = () => {},
  deviceId,
  ...props
}: {
  onDetect: (value: string) => void
  onError?: (err: unknown) => void
  deviceId?: string
} & Pick<WebcamProps, 'videoConstraints' | 'style' | 'className'>) {
  const webcamRef = useRef<Webcam | null>(null)

  const barcodeDetector = useMemo(() => new BarcodeDetector(), [])

  useInterval(async () => {
    if (!webcamRef.current) {
      return
    }

    const imageBase64 = webcamRef.current.getScreenshot()
    const image = new Image()
    image.src = `data:image/jpeg;base64,${imageBase64}`

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

  return <Webcam {...props} ref={webcamRef} screenshotFormat="image/jpeg" />
}
