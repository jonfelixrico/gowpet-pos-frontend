'use client'

import { Flex } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import RouteLinkButton from '@/components/common/RouteLinkButton'

export default function RouteLinks() {
  const pathname = usePathname()

  return (
    <Flex direction="column" gap={2}>
      <RouteLinkButton
        href="/catalog"
        pattern={/^\/catalog.*/}
        currentPath={pathname}
        data-route-link="catalog"
      >
        Catalog
      </RouteLinkButton>

      <RouteLinkButton
        href="/billing"
        pattern={/^\/billing.*/}
        currentPath={pathname}
        data-route-link="billing"
      >
        Billing
      </RouteLinkButton>

      <RouteLinkButton
        href="/settings"
        pattern={/^\/settings.*/}
        currentPath={pathname}
        data-route-link="settings"
      >
        Settings
      </RouteLinkButton>
    </Flex>
  )
}
