'use client'

import useDetectClient from '@/hooks/detect-client'
import { Box } from '@chakra-ui/react'
import { ReactNode, RefObject, createContext, useContext, useRef } from 'react'
import { createPortal } from 'react-dom'

const OffscreenContainerContext =
  createContext<RefObject<HTMLDivElement> | null>(null)

export function OffscreenContainerProvider({
  children,
}: {
  children?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <Box
        data-id="offscreen-container"
        position="absolute"
        left="calc(-100dvw + -9999px)"
        aria-hidden
        ref={ref}
      />

      <OffscreenContainerContext.Provider value={ref}>
        {children}
      </OffscreenContainerContext.Provider>
    </>
  )
}

export function useOffscreenContainer() {
  return useContext(OffscreenContainerContext)
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
