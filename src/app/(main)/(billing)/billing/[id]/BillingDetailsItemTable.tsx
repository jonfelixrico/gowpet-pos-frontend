import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { BillingDetailsItemData } from './BillingDetailsData'

export function BillingDetailsItemTableRow({
  item: { catalogItem, price, quantity },
}: {
  item: BillingDetailsItemData
}) {
  return (
    <Tr>
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

export default function BillingDetailsItemTable({
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
            <BillingDetailsItemTableRow item={item} key={index} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
