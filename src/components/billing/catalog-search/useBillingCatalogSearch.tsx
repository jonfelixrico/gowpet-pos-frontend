import { fetchData } from '@/utils/fetch-utils'
import qs from 'query-string'
import { CatalogItem } from '@/types/CatalogItem'
import Cookies from 'js-cookie'

export function useBillingCatalogSearch() {
  async function fetchResults(searchTerm: string, pageNo: number) {
    const qp = qs.stringify({
      searchTerm,
      pageNo,
    })

    const { data, headers } = await fetchData<CatalogItem[]>(
      `/api/catalog?${qp}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    )
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
