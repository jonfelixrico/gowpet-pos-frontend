import { fetchData } from '@/utils/fetch-utils'
import qs from 'query-string'
import { CatalogItem } from '@/types/CatalogItem'

export function useBillingCatalogSearch() {
  async function fetchResults(searchTerm: string, pageNo: number) {
    const url = qs.stringifyUrl({
      url: '/api/catalog',
      query: {
        searchTerm,
        pageNo,
      },
    })

    const { data, headers } = await fetchData<CatalogItem[]>(url)
    const pageCount = headers.get('X-Total-Count')
    if (pageCount === null) {
      throw new Error('Data error: page count not incldued')
    }

    return {
      items: data,
      pageCount: parseInt(pageCount),
    }
  }

  return {
    fetchResults,
  }
}
