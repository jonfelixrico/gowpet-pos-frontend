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

  // TODO use API routes for this endpoint
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

export function useSearch(initialState: SearchState) {
  const [searchState, setSearchState] = useState<SearchState>(initialState)

  async function startSearch(searchTerm: string) {
    const { items, pageCount } = await fetchResults(searchTerm, 0)
    setSearchState({
      pageNo: 0,
      pageCount,
      searchTerm,
      items,
    })
  }

  async function loadMore() {
    const newPageNo = searchState.pageNo + 1

    const { items: fetchedItems, pageCount } = await fetchResults(
      searchState.searchTerm,
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
  }

  return {
    searchState,
    startSearch,
    loadMore,
  }
}
