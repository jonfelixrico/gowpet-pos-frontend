import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function CatalogLayout(props: { children: ReactNode }) {
  return (
    <Box width="1000px" marginX="auto" height="100dvh">
      {props.children}
    </Box>
  )
}
