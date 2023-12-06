import { Box } from '@chakra-ui/react'
import BarcodeBoundingBox from './BarcodeBoundingBox'
import { useEffect, useMemo, useState } from 'react'
import { useInterval } from 'react-use'

interface LastDetect {
  timestamp: number
  barcodes: DetectedBarcode[]
}

export interface BarcodeScannerRealTimePreviewProps {
  width: number
  height: number
  barcodes: DetectedBarcode[]
  persistTime?: number
  color?: string
  barcodeColors?: Record<string, string>
}

export default function BarcodeScannerRealTimePreview({
  width,
  height,
  barcodes,
  persistTime = 500,
  color = 'red',
  barcodeColors = {},
}: BarcodeScannerRealTimePreviewProps) {
  const [lastDetect, setLastDetect] = useState<LastDetect>()
  const [now, setNow] = useState(Date.now())

  useInterval(() => {
    setNow(Date.now())
  }, persistTime)

  useEffect(() => {
    if (barcodes?.length) {
      setLastDetect({
        barcodes,
        timestamp: Date.now(),
      })
    }
  }, [barcodes])

  const toDisplay = useMemo(() => {
    if (!lastDetect || now > lastDetect.timestamp + persistTime) {
      return []
    }

    return lastDetect.barcodes
  }, [now, lastDetect, persistTime])

  return (
    <Box width={width} height={height} position="relative">
      {toDisplay.map((barcode) => (
        <BarcodeBoundingBox
          key={barcode.rawValue}
          barcode={barcode}
          height={height}
          width={width}
          color={barcodeColors[barcode.rawValue] ?? color}
        />
      ))}
    </Box>
  )
}
