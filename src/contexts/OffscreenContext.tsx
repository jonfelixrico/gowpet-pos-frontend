'use client'

import { Box } from '@chakra-ui/react'
import { ReactNode, RefObject, createContext, useContext, useRef } from 'react'

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
