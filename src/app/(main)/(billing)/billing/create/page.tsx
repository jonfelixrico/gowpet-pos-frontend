import { apiFetchData } from '@/server-utils/resource-api-util'
import BillingCreateContent from './BillingCreateContent'
import { CatalogItem } from '@/types/CatalogItem'

export default async function BillingCreatePage() {
  const { data, headers } =
    await apiFetchData<CatalogItem[]>('/catalog?pageNo=0')

  return (
    <BillingCreateContent
      initialState={{
        items: data,
        pageCount: parseInt(headers.get('X-Total-Count') ?? '0'),
        pageNo: 0,
        searchTerm: '',
      }}
    />
  )
}
