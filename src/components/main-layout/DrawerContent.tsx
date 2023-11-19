import { Button, Flex, FlexProps, Spacer } from '@chakra-ui/react'
import DrawerRoutes from './DrawerRoutes'

export default function DrawerContent(flexProps: FlexProps) {
  return (
    <Flex {...flexProps} direction="column">
      <DrawerRoutes />
      <Spacer />
      <Button>Log Out</Button>
    </Flex>
  )
}
