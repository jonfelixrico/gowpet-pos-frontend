import {
  Card,
  CardBody,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

export default function CatalogReportsPage() {
  return (
    <Container maxW="container.md" padding={2}>
      <Card>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Unit Price</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Test</Td>
                  <Td isNumeric>100</Td>
                  <Td isNumeric>100</Td>
                  <Td isNumeric>10000</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Container>
  )
}
