import { CatalogItem } from '@/types/CatalogItem'
import {
  Button,
  Flex,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  forwardRef,
} from '@chakra-ui/react'
import Link from 'next/link'

function ContentItemTableRow({ item }: { item: CatalogItem }) {
  return (
    <Tr data-cy="row" data-catalog-id={item.id}>
      <Td data-cy="name">{item.name}</Td>
      <Td isNumeric data-cy="price">
        {item.price}
      </Td>
      <Td>
        <Flex justify="end" w="full">
          <Link
            href={`/catalog/${item.id}`}
            prefetch={false}
            data-cy="show-details"
          >
            <Button variant="ghost">Show Details</Button>
          </Link>
        </Flex>
      </Td>
    </Tr>
  )
}

export type CatalogItemTableProps = TableContainerProps & {
  items: CatalogItem[]
}

export default function CatalogItemTable({
  items,
  ...props
}: CatalogItemTableProps) {
  return (
    <TableContainer {...props}>
      <Table>
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
