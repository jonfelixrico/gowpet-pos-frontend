import { Button, Flex, FlexProps, Spacer } from '@chakra-ui/react'
import RouteLinks from './RouteLinks'

export default function DrawerContent(flexProps: FlexProps) {
  return (
    <Flex {...flexProps} direction="column">
      <RouteLinks />
      <Spacer />
      <Button variant="ghost" colorScheme="red">
        Log out
      </Button>
    </Flex>
  )
}
