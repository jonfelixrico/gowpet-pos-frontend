import { apiFetchData } from '@/utils/resource-api-util'
import { Center } from '@chakra-ui/react'

interface CatalogItem {
  id: string
  name: string
  price: number
  type: 'SERVICE'
}

export default async function Catalog() {
  const { data } = await apiFetchData<CatalogItem[]>('/catalog')

  if (!data.length) {
    return <Center>No items</Center>
  }

  return (
    <main>
      {data.map((item) => (
        <div key={item.id}>{JSON.stringify(data)}</div>
      ))}
    </main>
  )
}
