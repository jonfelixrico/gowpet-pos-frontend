import { fetchData } from '@/utils/fetch-utils'
import { useEffect, useState } from 'react'
import qs from 'query-string'
import { CatalogItem } from '@/types/CatalogItem'

export function useBillingCatalogSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pageNo, setPageNo] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [items, setItems] = useState<CatalogItem[]>([])

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

  useEffect(() => {
    async function run() {
      const { pageCount, items } = await fetchResults(searchTerm, pageNo)
      setPageCount(pageCount)
      setItems(items)
    }
    run()
  }, [searchTerm, pageNo, setPageCount, setItems])

  return {
    items,
    searchTerm,

    setSearchTerm(searchTerm: string) {
      setSearchTerm(searchTerm)
      setPageNo(0)
    },

    hasItemsRemaining: pageNo < pageCount - 1,

    loadMore() {
      if (pageNo === pageCount - 1) {
        return
      }

      setPageNo((pageNo) => pageNo + 1)
    },
  }
}
