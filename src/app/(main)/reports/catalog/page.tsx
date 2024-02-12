import { apiFetchData } from '@/server-utils/resource-api-util'
import {
  CatalogReportEntry,
  CatalogReportItemReference,
} from '@/types/catalog-report-typings'
import { hydrateEntries } from '@/utils/catalog-report-utils'
import {
  Button,
  Card,
  CardBody,
  Container,
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

export default async function CatalogReportsPage() {
  const { data } = await apiFetchData<{
    references: CatalogReportItemReference[]
    entries: CatalogReportEntry[]
  }>('/catalog/report')
  const hydrated = hydrateEntries(data.entries, data.references)

  return (
    <Container
      maxW="container.md"
      padding={2}
      as={Flex}
      direction="column"
      gap={2}
    >
      <Flex justify="end">
        <Link href="/reports/catalog/export" download>
          <Button colorScheme="blue">Export</Button>
        </Link>
      </Flex>

      <Card flex={1}>
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
                {hydrated.map((data) => {
                  return (
                    <Tr key={`${data.name}/${data.price}`}>
                      <Td>{data.name}</Td>
                      <Td>{data.price}</Td>
                      <Td>{data.quantity}</Td>
                      <Td>{data.price * data.quantity}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Container>
  )
}
