import { BillingItem } from '@/types/Billing'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

function Row({ item: { name, price, quantity } }: { item: BillingItem }) {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td isNumeric>{price}</Td>
      <Td>{quantity}</Td>
      <Td isNumeric>{price * quantity}</Td>
    </Tr>
  )
}

export default function BillingDetailsItemTable({
  items,
}: {
  items: BillingItem[]
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
            <Row item={item} key={item.catalogId} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
