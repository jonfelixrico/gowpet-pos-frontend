import { CatalogItem } from '@/models/CatalogItem'
import {
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

function ContentItemTableRow({ item }: { item: CatalogItem }) {
  return (
    <Tr>
      <Td>{item.name}</Td>
      <Td isNumeric>{item.price}</Td>
    </Tr>
  )
}

export default function CatalogItemTable({ items }: { items: CatalogItem[] }) {
  if (!items.length) {
    return <Center flex="1">No items</Center>
  }

  return (
    <TableContainer flex="1">
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>

        <Tbody>
          {items.map((item) => (
            <ContentItemTableRow item={item} key={item.id} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
