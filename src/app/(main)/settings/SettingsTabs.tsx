'use client'

import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const PATH_REGEXP = /.*settings\/(\w+)$/
const PATH_INDEX_MAPPING: Record<string, number> = {
  billing: 0,
}

export default function SettingsTabs() {
  const pathname = usePathname()
  const currentIndex = useMemo(() => {
    const result = PATH_REGEXP.exec(pathname)
    if (!result) {
      return 0
    }

    return PATH_INDEX_MAPPING[result[1]] ?? 0
  }, [pathname])

  return (
    <Tabs index={currentIndex} variant="soft-rounded" colorScheme="blue">
      <TabList>
        <Tab>Billing</Tab>
      </TabList>
    </Tabs>
  )
}
