import { SVGAttributes, useMemo, useRef, useState } from 'react'
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
  }, 1000 / 5)

  return (
    <Webcam {...webcamProps} ref={webcamRef} screenshotFormat="image/jpeg" />
  )
}

function BarcodeBoundingBox({
  barcodeData: { cornerPoints },
  width,
  height,
  strokeWidth = 1,
  stroke = 'green',
}: {
  barcodeData: DetectedBarcode
  width: number
  height: number
} & Pick<SVGAttributes<SVGPolylineElement>, 'stroke' | 'strokeWidth'>) {
  const points = useMemo(
    () =>
      cornerPoints
        .concat(cornerPoints[0]) // this is to complete the rect
        .map(({ x, y }) => `${x}, ${y}`)
        .join(' '),
    [cornerPoints]
  )
  return (
    <svg width={width} height={height}>
      <polyline
        points={points}
        fill="transparent"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
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
      {detectedBarcodes.map((detected, index) => {
        return (
          <Box
            key={detected.rawValue}
            position="absolute"
            width={`${width}px`}
            height={`${height}px`}
          >
            <BarcodeBoundingBox
              barcodeData={detected}
              height={height}
              width={width}
              stroke={index === 0 ? 'red' : 'green'}
            />
          </Box>
        )
      })}
      <BaseBarcodeCamera {...props} onDetect={handleDetect} />
    </Box>
  )
}
