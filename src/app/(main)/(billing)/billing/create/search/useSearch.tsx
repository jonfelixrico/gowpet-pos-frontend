import { CatalogItem } from '@/types/CatalogItem'
import { useState } from 'react'
import { fetchData } from '@/utils/fetch-utils'
import qs from 'query-string'

export interface SearchState {
  searchTerm: string
  pageNo: number
  pageCount: number
  items: CatalogItem[]
}

async function fetchResults(searchTerm: string, pageNo: number) {
  const qp = qs.stringify({
    searchTerm,
    pageNo,
  })

  const { data, headers } = await fetchData<CatalogItem[]>(
    `/billing/catalog-search?${qp}`
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

export function useSearch(initialState?: SearchState) {
  const [{ items, pageCount, pageNo, searchTerm }, setSearchState] =
    useState<SearchState>(
      initialState ?? {
        items: [],
        pageCount: 0,
        pageNo: 0,
        searchTerm: '',
      }
    )

  const [isLoading, setIsLoading] = useState(false)

  async function startSearch(searchTerm: string) {
    setIsLoading(true)
    try {
      const { items, pageCount } = await fetchResults(searchTerm, 0)
      setSearchState({
        pageNo: 0,
        pageCount,
        searchTerm,
        items,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function loadMore() {
    setIsLoading(true)

    try {
      const newPageNo = pageNo + 1
      const { items: fetchedItems, pageCount } = await fetchResults(
        searchTerm,
        newPageNo
      )

      setSearchState(({ searchTerm, items }) => {
        return {
          pageCount,
          pageNo: newPageNo,
          searchTerm,
          items: items.concat(fetchedItems),
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    items,
    canLoadMore: pageNo < pageCount - 1,
    startSearch,
    loadMore,
    isLoading,
  }
}
