'use client'

import { Url } from '@/types/Url'
import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import UrlPattern from 'url-pattern'

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
    <Link href={href}>
      <Text fontWeight={isActive ? 'normal' : 'bold'}>{children}</Text>
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

  return ROUTES.map(({ href, label, pattern }, index) => (
    <RouteLink key={index} href={href} pattern={pattern} currentPath={pathname}>
      {label}
    </RouteLink>
  ))
}
