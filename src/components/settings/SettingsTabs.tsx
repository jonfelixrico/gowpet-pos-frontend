'use client'

import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Else, If, Then } from 'react-if'

function SettingsTab({
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

export default function SettingsTabs() {
  const pathname = usePathname()

  return (
    <>
      <SettingsTab
        href="/settings/billing"
        isActive={/\/billing$/.test(pathname)}
      >
        Billing
      </SettingsTab>
      <SettingsTab href="/settings/user" isActive={/\/user.*/.test(pathname)}>
        Manage Users
      </SettingsTab>
    </>
  )
}
