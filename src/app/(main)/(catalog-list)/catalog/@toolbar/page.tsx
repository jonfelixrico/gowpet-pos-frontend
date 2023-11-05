import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'

export default function CatalogListToolbar() {
  return (
    <Box>
      <InputGroup>
        <Input />
        <InputRightElement padding={5}>
          {/* TODO replace with search button */}
          <Button size="sm">Test</Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
