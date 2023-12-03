/* eslint-disable jsx-a11y/alt-text */

import { Box, Image } from '@chakra-ui/react'
import BarcodeBoundingBox from './BarcodeBoundingBox'

export default function BarcodeScanResultPreview({
  barcode,
  width,
  height,
  imageUrl,
}: {
  barcode: DetectedBarcode
  width: number
  height: number
  imageUrl: string
}) {
  return (
    // TODO i18nize the aria-label
    <Box
      height="fit-content"
      width="fit-content"
      aria-label="Image with detected barcode"
    >
      <Box width="fit-content" height="fit-content" position="absolute">
        <BarcodeBoundingBox
          barcode={barcode}
          height={height}
          width={width}
          color="green"
        />
      </Box>

      {/*
        We're not providing the alt here because we want to show the iamge and the bounding box
        as if it was a single image.
       */}
      <Image src={imageUrl} />
    </Box>
  )
}
