'use client'

import { Button, ButtonProps } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function RefreshButton(props: Omit<ButtonProps, 'onChange'>) {
  const { refresh } = useRouter()
  return <Button {...props} onClick={refresh} />
}
