import { CatalogItem } from '@/types/CatalogItem'
import {
  Button,
  Center,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import Link from 'next/link'

function ContentItemTableRow({ item }: { item: CatalogItem }) {
  return (
    <Tr data-cy="row" data-catalog-id={item.id}>
      <Td data-cy="name">{item.name}</Td>
      <Td isNumeric>{item.price}</Td>
      <Td>
        <Flex justify="end" w="full">
          <Link href={`/catalog/${item.id}`} prefetch={false}>
            <Button variant="ghost" data-cy="showDetails">
              Show Details
            </Button>
          </Link>
        </Flex>
      </Td>
    </Tr>
  )
}

export default function CatalogItemTable({ items }: { items: CatalogItem[] }) {
  if (!items.length) {
    return <Center flex="1">No items</Center>
  }

  return (
    <TableContainer flex="1">
      <Table data-cy="table">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
            {/* intended to be empty; this is for the buttons */}
            <Th></Th>
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
