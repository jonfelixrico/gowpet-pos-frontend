import { Box } from '@chakra-ui/react'
import CatalogSearchInput from '@/components/catalog/list/CatalogSearchInput'

export default function CatalogListToolbar({
  searchParams,
}: {
  searchParams: {
    searchTerm?: string | null
  }
}) {
  return (
    <Box>
      <CatalogSearchInput initialValue={searchParams.searchTerm} />
    </Box>
  )
}
