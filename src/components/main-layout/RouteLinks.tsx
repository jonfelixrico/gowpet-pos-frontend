'use client'

import { DataAttributes } from '@/types/DataAttributes'
import { Url } from '@/types/Url'
import { Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

function RouteLink({
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

export default function RouteLinks() {
  const pathname = usePathname()

  return (
    <Flex direction="column" gap={2}>
      <RouteLink
        href="/catalog"
        pattern={/^\/catalog.*/}
        currentPath={pathname}
        data-route-link="catalog"
      >
        Catalog
      </RouteLink>

      <RouteLink
        href="/billing"
        pattern={/^\/billing.*/}
        currentPath={pathname}
        data-route-link="billing"
      >
        Billing
      </RouteLink>
    </Flex>
  )
}
