import { Button, Flex, FlexProps, Spacer } from '@chakra-ui/react'
import RouteLinks from './RouteLinks'

export default function DrawerContent(flexProps: FlexProps) {
  return (
    <Flex {...flexProps} direction="column">
      <RouteLinks />
      <Spacer />
      <Button>Log Out</Button>
    </Flex>
  )
}
