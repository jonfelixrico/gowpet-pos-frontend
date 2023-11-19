'use client'

import { Flex, FlexProps, IconButton } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import If from '../common/If'

export default function MainLayout({
  drawer,
  children,
  header,
  ...flexProps
}: FlexProps & {
  drawer?: ReactNode
  children?: ReactNode
  header?: ReactNode
}) {
  const [showDrawer, setShowDrawer] = useState(true)
  function toggleDrawer() {
    setShowDrawer((val) => !val)
  }

  return (
    <Flex {...flexProps} direction="column">
      <Flex as="header" padding={2} backgroundColor="blue.500">
        {/* TODO change color to white */}
        <IconButton
          aria-label="Open menu"
          isRound
          onClick={toggleDrawer}
          variant="ghost"
          icon={<GiHamburgerMenu />}
        />

        <Flex flex={1}>{header}</Flex>
      </Flex>

      <Flex flex={1}>
        <If condition={showDrawer}>
          <Flex width="15dvw">{drawer}</Flex>
        </If>

        <Flex flex={1} as="main" background="gray.100">
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
