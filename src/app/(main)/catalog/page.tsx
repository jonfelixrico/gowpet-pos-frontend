import { apiFetchData } from '@/utils/resource-api-util'
import { Box, Button, Center, Divider, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface CatalogItem {
  id: string
  name: string
  price: number
  type: 'SERVICE'
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column" gap="2" as="main" height="100%">
      <Flex justify="end">
        <Button>Create</Button>
      </Flex>
      <Divider />
      {children}
    </Flex>
  )
}

function Content({ items }: { items: CatalogItem[] }) {
  if (!items.length) {
    return <Center flex="1">No items</Center>
  }

  return (
    <Box flex="1">
      {items.map((item) => (
        <div key={item.id}>{JSON.stringify(item)}</div>
      ))}
    </Box>
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
