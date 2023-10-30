import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogEditForm from './CatalogEditForm'

interface Params {
  catalogId: string
}

export default async function CatalogEdit({ params }: { params: Params }) {
  const { data } = await apiFetchData<CatalogItem>(
    `/catalog/product/${params.catalogId}`,
    {
      cache: 'no-cache',
    }
  )

  return <CatalogEditForm id={data.id} initialValues={data} />
}
