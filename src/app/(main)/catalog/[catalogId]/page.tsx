import { CatalogItem } from '@/models/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'

interface Params {
  catalogId: string
}

export default async function CatalogDetails({ params }: { params: Params }) {
  const { data } = await apiFetchData<CatalogItem>(
    `/catalog/product/${params.catalogId}`,
    {
      cache: 'no-cache',
    }
  )

  return <div>{JSON.stringify(data)}</div>
}
