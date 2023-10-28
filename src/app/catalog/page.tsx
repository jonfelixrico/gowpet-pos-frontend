import { apiFetchData } from '@/utils/resource-api-util'

interface CatalogItem {
  id: string
  name: string
  price: number
  type: 'SERVICE'
}

export default async function Catalog() {
  const { data } = await apiFetchData<CatalogItem[]>('/catalog')

  if (!data.length) {
    return <main>No items</main>
  }

  return (
    <main>
      {data.map((item) => (
        <div key={item.id}>{JSON.stringify(data)}</div>
      ))}
    </main>
  )
}
