'use client'

export function cropY(
  source: HTMLCanvasElement,
  start: number,
  end: number
): HTMLCanvasElement {
  const height = end - start

  const cropped = document.createElement('canvas')
  cropped.width = source.width
  cropped.height = height

  const ctx = cropped.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas 2d context not found')
  }

  ctx.drawImage(
    source,
    0,
    start,
    source.width,
    height,
    0,
    0,
    source.width,
    height
  )

  return cropped
}
