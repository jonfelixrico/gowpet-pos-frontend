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

function Row({
  item: { catalogItem, price, quantity },
}: {
  item: BillingDetailsItemData
}) {
  return (
    <Tr>
      <Td>{catalogItem.name}</Td>
      <Td isNumeric>{price}</Td>
      <Td>{quantity}</Td>
      <Td isNumeric>{price * quantity}</Td>
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
          {items.map((item) => (
            <Row item={item} key={item.catalogItem.id} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
