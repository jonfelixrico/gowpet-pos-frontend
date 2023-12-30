'use client'

import { DataAttributes } from '@/types/DataAttributes'
import { Url } from '@/types/Url'
import { Button, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode, useMemo } from 'react'

export default function RouteLinkButton({
  href,
  children,
  pattern,
  currentPath,
  ...dataAttrs
}: {
  href: Url
  children?: ReactNode
  pattern: RegExp
  currentPath: string
} & DataAttributes) {
  const isActive = useMemo(
    () => pattern.test(currentPath),
    [currentPath, pattern]
  )

  return (
    <Link href={href} prefetch={false} {...dataAttrs}>
      <Button
        width="full"
        variant="ghost"
        colorScheme={isActive ? 'blue' : undefined}
      >
        <Text textAlign="left" width="full">
          {children}
        </Text>
      </Button>
    </Link>
  )
}
