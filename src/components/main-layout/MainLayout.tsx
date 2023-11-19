import { Box, Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

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
  return (
    <Flex {...flexProps} direction="column">
      <Box as="header">{header}</Box>
      <Flex flex={1}>
        <Flex width="15dvw">{drawer}</Flex>
        <Flex flex={1} as="main">
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
