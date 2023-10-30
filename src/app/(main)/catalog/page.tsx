import CatalogItemTable from '@/components/catalog/CatalogItemTable'
import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { Button, Center, Divider, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

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

function Content({ items }: { items: CatalogItem[] }) {
  if (!items.length) {
    return <Center flex="1">No items</Center>
  }

  return <CatalogItemTable items={items} />
}

export default async function Catalog() {
  const { data } = await apiFetchData<CatalogItem[]>('/catalog', {
    cache: 'no-store',
  })
  return (
    <Layout>
      <Content items={data} />
    </Layout>
  )
}
