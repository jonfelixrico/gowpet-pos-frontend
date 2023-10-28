import { apiFetch } from '@/utils/resource-api-util'

interface CatalogItem {
  id: string
  name: string
  price: number
  type: 'SERVICE'
}

export default async function Catalog() {
  const response = await apiFetch('/catalog')
  const data = response.json() as unknown as CatalogItem[]

  return data.map((item) => <div key={item.id}>{JSON.stringify(data)}</div>)
}
