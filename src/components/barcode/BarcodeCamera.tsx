import { SVGAttributes, useMemo, useRef, useState } from 'react'
import Webcam, { WebcamProps } from 'react-webcam'
import { useInterval, useMeasure } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'
import { Box, Button, Flex } from '@chakra-ui/react'
import { uniqBy } from 'lodash'

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
        formats: ['qr_code', 'upc_a', 'upc_e', 'ean_13', 'ean_8'],
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
  const [mirrored, setMirorred] = useState(false)

  function handleDetect(barcodes: DetectedBarcode[]) {
    const postProcessed = uniqBy(barcodes, ({ rawValue }) => rawValue)
    setDetectedBarcodes(postProcessed)
    if (postProcessed.length) {
      onDetect(postProcessed[0].rawValue)
    }
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
