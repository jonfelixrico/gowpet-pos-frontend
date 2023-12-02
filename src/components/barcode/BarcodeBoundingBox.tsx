import { useMemo } from 'react'

export default function BarcodeBoundingBox({
  barcode: { cornerPoints },
  width,
  height,
  color,
}: {
  barcode: DetectedBarcode
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
