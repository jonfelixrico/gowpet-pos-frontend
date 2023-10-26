'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

// Followed https://chakra-ui.com/getting-started/nextjs-guide#app-directory-setup

export function Providers({ 
    children 
  }: { 
  children: ReactNode
  }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}