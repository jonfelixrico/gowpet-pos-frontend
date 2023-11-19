'use client'

import { Url } from '@/types/Url'
import { Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import If from '../common/If'

function RouteLink({
  href,
  children,
  pattern,
  currentPath,
}: {
  href: Url
  children?: ReactNode
  pattern: RegExp
  currentPath: string
}) {
  const isActive = useMemo(
    () => pattern.test(currentPath),
    [currentPath, pattern]
  )

  return (
    <Link href={href} prefetch={false}>
      <If condition={isActive}>
        <Button width="full" colorScheme="blue">
          {children}
        </Button>
      </If>

      <If condition={!isActive}>
        <Button width="full" variant="ghost">
          {children}
        </Button>
      </If>
    </Link>
  )
}

interface RouteData {
  href: Url
  pattern: RegExp
  label: string
}

const ROUTES: RouteData[] = [
  {
    href: {
      pathname: '/billing',
    },
    label: 'Billing',
    pattern: /^\/billing.*/,
  },
  {
    href: {
      pathname: '/catalog',
    },
    label: 'Catalog',
    pattern: /^\/catalog.*/,
  },
]

export default function DrawerRoutes() {
  const pathname = usePathname()

  return (
    <Flex direction="column" gap={2}>
      {ROUTES.map(({ href, label, pattern }, index) => (
        <RouteLink
          key={index}
          href={href}
          pattern={pattern}
          currentPath={pathname}
        >
          {label}
        </RouteLink>
      ))}
    </Flex>
  )
}
