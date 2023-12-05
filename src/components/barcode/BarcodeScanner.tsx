import { useMemo, useRef, useState } from 'react'
import Webcam, { WebcamProps } from 'react-webcam'
import { useInterval, useMeasure } from 'react-use'
import { BarcodeDetector } from 'barcode-detector'
import { Box, Button, Flex } from '@chakra-ui/react'
import { uniqBy } from 'lodash'
import BarcodeScannerRealTimePreview, {
  BarcodeScannerRealTimePreviewProps,
} from './BarcodeScannerRealTimePreview'
import { If, Then } from 'react-if'

type CameraOptions = {
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

  max?: number

  disablePreview?: boolean
}

interface BaseDetectionResults {
  barcodes: DetectedBarcode[]
  image: string
}

function BaseBarcodeCamera({
  onDetect,
  onError = () => {},
  options = {},
  max,
  ...webcamProps
}: Partial<WebcamProps> & {
  onDetect: (value: BaseDetectionResults | null) => void
  options?: CameraOptions
  onError?: (err: unknown) => void
}) {
  const webcamRef = useRef<Webcam | null>(null)

  const barcodeDetector = useMemo(
    () =>
      new BarcodeDetector({
        formats: options?.formats,
      }),
    [options?.formats]
  )

  useInterval(
    async () => {
      if (!webcamRef.current || options?.isPaused) {
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

        const processed = uniqBy(
          results.toSorted((a, b) => a.rawValue.localeCompare(b.rawValue)),
          ({ rawValue }) => rawValue
        )

        const sliced = processed.slice(options?.max)
        onDetect(
          sliced.length
            ? {
                barcodes: sliced,
                image: imageUrl,
              }
            : null
        )
      } catch (e) {
        onError(e)
      }
    },
    !options?.isPaused ? options?.frequency ?? 100 : null
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

export type BarcodeCameraProps = {
  onDetect: (results: DetectionResults) => void
  onError?: (err: unknown) => void
  options?: CameraOptions
  previewOptions?: Pick<
    BarcodeScannerRealTimePreviewProps,
    'color' | 'barcodeColors'
  >
}

export default function BarcodeScanner({
  onDetect,
  options = {},
  previewOptions = {},
  ...props
}: Pick<WebcamProps, 'videoConstraints' | 'style' | 'className'> &
  BarcodeCameraProps) {
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

      <If condition={!options?.disablePreview}>
        <Then>
          {/* This part is to show the detected barcodes in the camera */}
          <Box position="absolute" width="full" height="full">
            <BarcodeScannerRealTimePreview
              width={width}
              height={height}
              barcodes={detectedBarcodes}
              {...previewOptions}
            />
          </Box>
        </Then>
      </If>

      <BaseBarcodeCamera
        {...props}
        options={options}
        onDetect={handleDetect}
        mirrored={mirrored}
      />
    </Box>
  )
}
