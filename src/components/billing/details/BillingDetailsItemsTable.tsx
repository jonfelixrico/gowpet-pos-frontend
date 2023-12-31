import { SavedBillingItem } from '@/types/SavedBilling'
import {
  Table,
  TableContainer,
  TableContainerProps,
  TableRowProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

function Row({
  item: { catalogItem, price, quantity },
  ...rowProps
}: {
  item: SavedBillingItem
} & TableRowProps) {
  return (
    <Tr {...rowProps}>
      <Td data-cy="name">{catalogItem.name}</Td>
      <Td data-cy="price" isNumeric>
        {price}
      </Td>
      <Td data-cy="quantity">{quantity}</Td>
      <Td data-cy="amount" isNumeric>
        {price * quantity}
      </Td>
    </Tr>
  )
}

export default function BillingDetailsItemsTable({
  items,
  ...tableProps
}: {
  items: SavedBillingItem[]
} & TableContainerProps) {
  return (
    <TableContainer {...tableProps}>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>

        <Tbody>
          {items.map((item, index) => (
            <Row item={item} key={index} data-cy="row" />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
