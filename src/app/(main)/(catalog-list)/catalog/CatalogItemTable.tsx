import If from '@/components/common/If'
import { CatalogItem } from '@/types/CatalogItem'
import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

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
  footer,
  ...props
}: CatalogItemTableProps & {
  footer?: ReactNode
}) {
  return (
    <TableContainer {...props} overflowY="auto">
      <Table>
        <Thead position="sticky" top={0} backgroundColor="white">
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

        <If condition={!!footer}>
          <Tfoot>
            <Tr>
              <Td colSpan={3}>
                <Flex width="full" justify="end">
                  {footer}
                </Flex>
              </Td>
            </Tr>
          </Tfoot>
        </If>
      </Table>
    </TableContainer>
  )
}
