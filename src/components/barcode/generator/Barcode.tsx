'use client'

import { Image, ImageProps } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import JsBarcode, { Options } from 'jsbarcode'

export default function Barcode({
  value,
  options,
  ...props
}: ImageProps & {
  value: string
  options?: Options
}) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    const canvas = document.createElement('canvas')
    JsBarcode(canvas, value, options ?? {})
    setUrl(canvas.toDataURL())
  }, [value, options])

  return <Image {...props} src={url} alt={`Barcode of ${value}`} />
}
