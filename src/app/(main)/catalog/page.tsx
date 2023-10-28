import { apiFetchData } from '@/server-utils/resource-api-util'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Divider,
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
import { ReactNode } from 'react'

interface CatalogItem {
  id: string
  name: string
  price: number
  type: 'SERVICE'
}

export const dynamic = 'force-dynamic'

function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column" gap="2" as="main" height="100%">
      <Flex justify="end">
        <Link href="/catalog/create">
          <Button>Create</Button>
        </Link>
      </Flex>
      <Divider />
      {children}
    </Flex>
  )
}

function ContentItem({ item }: { item: CatalogItem }) {
  return (
    <Tr>
      <Td>{item.name}</Td>
      <Td isNumeric>{item.price}</Td>
    </Tr>
  )
}

function Content({ items }: { items: CatalogItem[] }) {
  if (!items.length) {
    return <Center flex="1">No items</Center>
  }

  return (
    <TableContainer flex="1">
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>

        <Tbody>
          {items.map((item) => (
            <ContentItem item={item} key={item.id} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default async function Catalog() {
  const { data } = await apiFetchData<CatalogItem[]>('/catalog')
  return (
    <Layout>
      <Content items={data} />
    </Layout>
  )
}
