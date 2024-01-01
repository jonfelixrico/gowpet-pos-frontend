'use client'

import { DataAttributes } from '@/types/DataAttributes'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Else, If, Then } from 'react-if'

function SettingsTab({
  href,
  isActive,
  children,
  ...dataAttrs
}: {
  href: string
  isActive: boolean
  children: ReactNode
} & DataAttributes) {
  return (
    <Link {...dataAttrs} href={href} prefetch={false} data-active={isActive}>
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
        data-tab="billing"
      >
        Billing
      </SettingsTab>

      <SettingsTab
        href="/settings/user"
        isActive={/\/user.*/.test(pathname)}
        data-tab="user"
      >
        Manage Users
      </SettingsTab>
    </>
  )
}
