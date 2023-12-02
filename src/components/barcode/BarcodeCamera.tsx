import { useMemo, useRef, useState } from 'react'
import Webcam, { WebcamProps } from 'react-webcam'
import { useInterval, useMeasure } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'
import { Box, Button, Flex } from '@chakra-ui/react'
import { uniqBy } from 'lodash'
import BarcodeBoundingBox from './BarcodeBoundingBox'

interface BaseDetectionResults {
  barcodes: DetectedBarcode[]
  image: string
}

type BaseBarcodeCameraProps = Partial<WebcamProps> & {
  onDetect: (value: BaseDetectionResults | null) => void
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

      {detectedBarcodes.map((barcode, index) => {
        return (
          <Box
            key={barcode.rawValue}
            position="absolute"
            width={`${width}px`}
            height={`${height}px`}
          >
            <BarcodeBoundingBox
              barcode={barcode}
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
