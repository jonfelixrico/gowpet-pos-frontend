'use client'

import { useEffect, useState } from 'react'

export default function useDetectClient() {
  /*
    Implementation was taken from
    https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  */
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
