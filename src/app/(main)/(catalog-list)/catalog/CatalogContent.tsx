import CatalogItemTable, {
  CatalogItemTableProps,
} from '@/app/(main)/(catalog-list)/catalog/CatalogItemTable'
import { Center, CenterProps } from '@chakra-ui/react'

export default function CatalogContent({
  items,
  ...props
}: CatalogItemTableProps & CenterProps) {
  if (!items.length) {
    return (
      <Center data-cy="empty" {...props}>
        No items
      </Center>
    )
  }

  return <CatalogItemTable items={items} {...props} data-cy="table" />
}
