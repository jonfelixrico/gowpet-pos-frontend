import { CatalogItem } from '@/types/CatalogItem'
import { apiFetchData } from '@/server-utils/resource-api-util'
import CatalogContent from './CatalogContent'

export const dynamic = 'force-dynamic'

export default async function Catalog() {
  const { data } = await apiFetchData<CatalogItem[]>('/catalog')
  return <CatalogContent items={data} height="full" />
}
