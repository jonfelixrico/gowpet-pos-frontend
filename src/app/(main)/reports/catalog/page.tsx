import { apiFetchData } from '@/server-utils/resource-api-util'
import {
  CatalogReportEntry,
  CatalogReportItemReference,
} from '@/types/catalog-report-typings'
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
import { keyBy } from 'lodash'

interface HydratedEntry extends CatalogReportEntry {
  name: string
}

export default async function CatalogReportsPage() {
  const { data } = await apiFetchData<{
    references: CatalogReportItemReference[]
    entries: CatalogReportEntry[]
  }>('/catalog/report')

  const indexedRefs = keyBy(data.references, (ref) => ref.id)
  const hydrated: HydratedEntry[] = data.entries.map((entry) => {
    return {
      ...entry,
      name: indexedRefs[entry.catalogItemId]?.name,
    }
  })

  return (
    <Container
      maxW="container.md"
      padding={2}
      as={Flex}
      direction="column"
      gap={2}
    >
      <Flex justify="end">
        <Button colorScheme="blue">Export</Button>
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
