import { useMemo, useRef, useState } from 'react'
import Webcam, { WebcamProps } from 'react-webcam'
import { useInterval, useMeasure } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'
import { Box, Button, Flex } from '@chakra-ui/react'
import { uniqBy } from 'lodash'

interface BaseDetectionResults {
  barcodes: DetectedBarcode[]
  image: string
}

type BaseBarcodeCameraProps = Partial<WebcamProps> & {
  onDetect: (value: BaseDetectionResults | null) => void
  onError?: (err: unknown) => void
}

const BARCODE_DETECTOR = new BarcodeDetector({
  formats: ['qr_code', 'upc_a', 'upc_e', 'ean_13', 'ean_8'],
})

function BaseBarcodeCamera({
  onDetect,
  onError = () => {},
  ...webcamProps
}: BaseBarcodeCameraProps) {
  const webcamRef = useRef<Webcam | null>(null)

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
      const results = await BARCODE_DETECTOR.detect(image)
      onDetect(
        results.length
          ? {
              barcodes: uniqBy(results, ({ rawValue }) => rawValue),
              image: imageUrl,
            }
          : null
      )
    } catch (e) {
      onError(e)
    }
  }, 1000 / 5)

  return (
    <Webcam
      {...webcamProps}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      screenshotQuality={1}
      imageSmoothing
    />
  )
}

function BarcodeBoundingBox({
  barcodeData: { cornerPoints },
  width,
  height,
  color,
}: {
  barcodeData: DetectedBarcode
  width: number
  height: number
  color: string
}) {
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
        fill={color}
        fillOpacity={0.38}
        strokeWidth={1}
        stroke={color}
      />
    </svg>
  )
}

export type DetectionResults = BaseDetectionResults & {
  width: number
  height: number
}

export type BarcodeCameraProps = Pick<
  WebcamProps,
  'videoConstraints' | 'style' | 'className'
> & {
  onDetect: (value: DetectionResults) => void
  onError?: (err: unknown) => void
}

export default function BarcodeCamera({
  onDetect,
  ...props
}: BarcodeCameraProps) {
  const [boxRef, { width, height }] = useMeasure<HTMLDivElement>()
  const [detectedBarcodes, setDetectedBarcodes] = useState<DetectedBarcode[]>(
    []
  )
  const [mirrored, setMirorred] = useState(false)

  function handleDetect(result: BaseDetectionResults | null) {
    if (!result) {
      setDetectedBarcodes([])
      return
    }

    setDetectedBarcodes(result.barcodes)
    onDetect({
      ...result,
      width,
      height,
    })
  }

  return (
    <Box
      ref={boxRef}
      width="fit-content"
      height="fit-content"
      position="relative"
    >
      <Flex
        width="full"
        height="full"
        justify="end"
        align="start"
        position="absolute"
        padding={1}
        zIndex={detectedBarcodes.length + 1}
      >
        <Button size="xs" onClick={() => setMirorred((mirrored) => !mirrored)}>
          Flip Camera
        </Button>
      </Flex>

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
              color={index === 0 ? 'red' : 'gray'}
            />
          </Box>
        )
      })}
      <BaseBarcodeCamera
        {...props}
        onDetect={handleDetect}
        mirrored={mirrored}
      />
    </Box>
  )
}
