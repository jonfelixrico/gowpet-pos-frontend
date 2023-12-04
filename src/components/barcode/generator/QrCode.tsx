'use client'

import { Image, ImageProps } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QrCode({
  value,
  options = {},
  ...others
}: { value: string; options?: QRCode.QRCodeToDataURLOptions } & ImageProps) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (!value) {
      setUrl('')
      return
    }

    QRCode.toDataURL(
      value,
      {
        errorCorrectionLevel: 'H',
        margin: 0,
        ...options,
      },
      (err, url) => {
        if (err) {
          setUrl('')
        } else {
          setUrl(url)
        }
      }
    )
  }, [value, options])

  if (!url) {
    return <></>
  }

  return <Image {...others} src={url} alt={`QR code for ${value}`} />
}
