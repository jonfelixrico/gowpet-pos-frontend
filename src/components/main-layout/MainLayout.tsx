import { Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function MainLayout({
  drawer,
  children,
  ...flexProps
}: FlexProps & {
  drawer?: ReactNode
  children?: ReactNode
}) {
  return (
    <Flex {...flexProps}>
      <Flex width="20dvw">{drawer}</Flex>
      <Flex flex={1}>{children}</Flex>
    </Flex>
  )
}
