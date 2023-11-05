import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import CatalogSearchInput from './CatalogSearchInput'

export default function CatalogListToolbar() {
  const { query } = useRouter()

  return (
    <Box>
      <CatalogSearchInput initialValue={query.searchTerm as string} />
    </Box>
  )
}
