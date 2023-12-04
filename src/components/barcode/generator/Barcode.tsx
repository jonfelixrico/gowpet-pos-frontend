'use client'

import { Image, ImageProps } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import JsBarcode, { Options } from 'jsbarcode'

const DEFAULT_WIDTH = 2
const DEFAULT_HEIGHT = 100

export default function Barcode({
  value,
  options = {},
  ...props
}: ImageProps & {
  value: string
  options?: Options
}) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    const canvas = document.createElement('canvas')
    JsBarcode(canvas, value, {
      displayValue: false,
      width: 10 * DEFAULT_WIDTH,
      height: 10 * DEFAULT_HEIGHT,
      margin: 0,
      ...options,
    })
    setUrl(canvas.toDataURL())
  }, [value, options])

  if (!url) {
    return <></>
  }

  return <Image {...props} src={url} alt={`Barcode of ${value}`} />
}
