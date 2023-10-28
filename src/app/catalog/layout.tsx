import { Box, Button, Divider, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function CatalogLayout(props: { children: ReactNode }) {
  return (
    <Flex direction="column" width="1000px" marginX="auto" height="100dvh" gap="2">
      <Flex justify="end">
        <Button>Create</Button>
      </Flex>
      <Divider />
      <Box>{props.children}</Box>
    </Flex>
  )
}
