'use client'

import useDetectClient from '@/hooks/detect-client'
import { DataAttributes } from '@/types/DataAttributes'
import { Box } from '@chakra-ui/react'
import { ReactNode, RefObject, createContext, useContext, useRef } from 'react'
import { createPortal } from 'react-dom'

const OffscreenContainerContext =
  createContext<RefObject<HTMLDivElement> | null>(null)

export function OffscreenContainerProvider({
  children,
  ...dataAttrs
}: {
  children?: ReactNode
} & DataAttributes) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <Box
        position="absolute"
        left="calc(-100dvw + -9999px)"
        aria-hidden
        ref={ref}
        {...dataAttrs}
      />

      <OffscreenContainerContext.Provider value={ref}>
        {children}
      </OffscreenContainerContext.Provider>
    </>
  )
}

export function OffscreenContainerPortal({
  children,
}: {
  children: ReactNode
}) {
  const ref = useContext(OffscreenContainerContext)
  const isClient = useDetectClient()

  if (ref?.current && isClient) {
    return <>{createPortal(children, ref.current)}</>
  }

  return <></>
}
