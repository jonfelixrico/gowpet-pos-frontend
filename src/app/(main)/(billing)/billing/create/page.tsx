import { apiFetchData } from '@/server-utils/resource-api-util'
import BillingCreateContent from './BillingCreateContent'
import { CatalogItem } from '@/types/CatalogItem'
import { Billing } from '@/types/Billing'
import { redirect } from 'next/navigation'

export default async function BillingCreatePage() {
  const { data, headers } =
    await apiFetchData<CatalogItem[]>('/catalog?pageNo=0')

  async function saveBilling(billing: Billing) {
    'use server'

    const dtoItems = billing.items.map(({ catalogId, quantity }) => {
      return {
        catalogId,
        quantity,
      }
    })

    await apiFetchData('/billing', {
      method: 'POST',
      body: JSON.stringify({
        ...billing,
        items: dtoItems,
      }),
    })
    redirect('/billing')
  }

  return (
    <BillingCreateContent
      initialState={{
        items: data,
        pageCount: parseInt(headers.get('X-Total-Count') ?? '0'),
        pageNo: 0,
        searchTerm: '',
      }}
      onSave={saveBilling}
    />
  )
}
