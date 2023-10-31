import CatalogItemTable, {
  CatalogItemTableProps,
} from '@/components/catalog/CatalogItemTable'
import { Center, CenterProps, forwardRef } from '@chakra-ui/react'

const CatalogContent = forwardRef<CatalogItemTableProps & CenterProps, 'div'>(
  ({ items, ...props }, ref) => {
    if (items.length) {
      return (
        <Center data-cy="empty" {...props} ref={ref}>
          No items
        </Center>
      )
    }

    return <CatalogItemTable items={items} {...props} data-cy="table" />
  }
)

export default CatalogContent
