import { useMemo, useRef } from 'react'
import Webcam from 'react-webcam'
import { useInterval } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'

export default function BarcodeScanner({
  onDetect,
  onError,
}: {
  onDetect: (value: string) => void
  onError: (err: unknown) => void
}) {
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

  return (
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      style={{
        width: '100%',
        height: '50dvh',
      }}
    />
  )
}
