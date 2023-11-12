import {
  Table,
  TableContainer,
  TableRowProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { BillingDetailsItemData } from './BillingDetailsData'

function Row({
  item: { catalogItem, price, quantity },
  ...otherProps
}: {
  item: BillingDetailsItemData
} & TableRowProps) {
  return (
    <Tr {...otherProps}>
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
}: {
  items: BillingDetailsItemData[]
}) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Quantity</Th>
          <Th>Amount</Th>
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
