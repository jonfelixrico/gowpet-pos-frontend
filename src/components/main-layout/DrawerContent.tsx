import { Flex, FlexProps, Spacer } from '@chakra-ui/react'
import RouteLinks from './RouteLinks'
import LogoutButton from './LogoutButton'

export default function DrawerContent(flexProps: FlexProps) {
  return (
    <Flex {...flexProps} direction="column">
      <RouteLinks />
      <Spacer />

      <LogoutButton />
    </Flex>
  )
}
