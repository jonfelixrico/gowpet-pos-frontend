import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

export default function CatalogListToolbar() {
  return (
    <Box>
      <InputGroup>
        <Input />
        <InputRightElement padding={5}>
          {/* TODO replace with search button */}
          <IconButton isRound aria-label="Search" size="sm">
            <FaSearch />
          </IconButton>
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
