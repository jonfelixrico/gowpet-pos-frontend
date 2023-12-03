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
  const points = useMemo(() => {
    /*
      Using just `cornerPoints` will render a rectangle with a missing side since the points
      just form an "unsealed" rectangle.

      We need to append the first point to "seal" the shape.
    */
    const rectPoints = [...cornerPoints, cornerPoints[0]]

    return rectPoints.map(({ x, y }) => `${x}, ${y}`).join(' ')
  }, [cornerPoints])

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
