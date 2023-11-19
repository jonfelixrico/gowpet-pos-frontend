'use client'

import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FlexProps,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'

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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const path = usePathname()
  useEffect(() => {
    onClose()
  }, [path, onClose])

  return (
    <>
      <Flex {...flexProps} direction="column">
        <Flex as="header" padding={2} backgroundColor="blue.500">
          {/* TODO change color to white */}
          <IconButton
            aria-label="Open menu"
            isRound
            onClick={onOpen}
            variant="ghost"
            icon={<GiHamburgerMenu />}
          />

          <Flex flex={1}>{header}</Flex>
        </Flex>

        <Flex flex={1} as="main" background="gray.100">
          {children}
        </Flex>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader as={Flex} justify="space-between" align="center">
            <Text>Menu</Text>

            <IconButton
              aria-label="Close drawer"
              onClick={onClose}
              icon={<IoMdClose />}
              variant="ghost"
              isRound
              size="sm"
            />
          </DrawerHeader>

          <Divider />

          <DrawerBody>{drawer}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
