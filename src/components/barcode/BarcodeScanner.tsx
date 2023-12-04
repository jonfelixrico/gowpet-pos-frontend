import { useMemo, useRef, useState } from 'react'
import Webcam, { WebcamProps } from 'react-webcam'
import { useInterval, useMeasure } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'
import { Box, Button, Flex } from '@chakra-ui/react'
import { uniqBy } from 'lodash'
import BarcodeScannerRealTimePreview, {
  BarcodeScannerRealTimePreviewProps,
} from './BarcodeScannerRealTimePreview'

interface BaseDetectionResults {
  barcodes: DetectedBarcode[]
  image: string
}

type BaseBarcodeCameraProps = {
  onDetect: (value: BaseDetectionResults | null) => void
  onError?: (err: unknown) => void

  /**
   * A list of formats that the scanner will only look for.
   * Leaving this undefined will cause the scanner to look for all formats.
   *
   * Defining only the formats that you need can give performance benefits.
   */
  formats?: BarcodeDetectorOptions['formats']

  /**
   * How frequent the camera will look for barcodes.
   */
  frequency?: number

  /**
   * Pauses barcode detection. The camera will still be active, though.
   */
  isPaused?: boolean
}

function BaseBarcodeCamera({
  onDetect,
  onError = () => {},
  formats,
  frequency = 100,
  isPaused,
  ...webcamProps
}: Partial<WebcamProps> & BaseBarcodeCameraProps) {
  const webcamRef = useRef<Webcam | null>(null)

  const barcodeDetector = useMemo(
    () =>
      new BarcodeDetector({
        formats,
      }),
    [formats]
  )

  useInterval(
    async () => {
      if (!webcamRef.current || isPaused) {
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
    },
    isPaused ? null : frequency
  )

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

export type BarcodeCameraProps = Omit<BaseBarcodeCameraProps, 'onDetect'> & {
  onDetect: (results: DetectionResults) => void
}

export default function BarcodeScanner({
  onDetect,
  color,
  barcodeColors,
  ...props
}: Pick<WebcamProps, 'videoConstraints' | 'style' | 'className'> &
  BarcodeCameraProps &
  Pick<BarcodeScannerRealTimePreviewProps, 'color' | 'barcodeColors'>) {
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
      {/* This will appear as a small button on the top-right */}
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

      {/* This part is to show the detected barcodes in the camera */}
      <Box position="absolute" width="full" height="full">
        <BarcodeScannerRealTimePreview
          width={width}
          height={height}
          barcodes={detectedBarcodes}
          color={color}
          barcodeColors={barcodeColors}
        />
      </Box>

      <BaseBarcodeCamera
        {...props}
        onDetect={handleDetect}
        mirrored={mirrored}
      />
    </Box>
  )
}
