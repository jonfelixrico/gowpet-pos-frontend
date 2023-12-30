'use client'

import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import { Else, If, Then } from 'react-if'

function RouteLinkButton({
  href,
  isActive,
  children,
}: {
  href: string
  isActive: boolean
  children: ReactNode
}) {
  return (
    <Link href={href} prefetch={false}>
      <If condition={isActive}>
        <Then>
          <Button width="full" colorScheme="blue">
            {children}
          </Button>
        </Then>
        <Else>
          <Button width="full" color="black" bgColor="white" variant="outline">
            {children}
          </Button>
        </Else>
      </If>
    </Link>
  )
}

const SUBPATHS = ['billing', 'accounts']
const SUBPATH_LABELS: Record<string, string> = {
  billing: 'Billing',
  accounts: 'Accounts',
}

export default function SettingsTabs() {
  const pathname = usePathname()
  const currentSubpath = useMemo(() => {
    const split = pathname.split('/')
    return split[split.length - 1]
  }, [pathname])

  return (
    <>
      {SUBPATHS.map((subpath) => (
        <RouteLinkButton
          key={subpath}
          href={`/settings/${subpath}`}
          isActive={subpath === currentSubpath}
        >
          {SUBPATH_LABELS[subpath]}
        </RouteLinkButton>
      ))}
    </>
  )
}
