import { CatalogItem } from '@/types/CatalogItem'
import { fetchData } from '@/utils/fetch-utils'

import { produce } from 'immer'
import pMemoize from 'p-memoize'
import { useCallback, useState } from 'react'

export default function useFetchCode() {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const doFetch = useCallback(
    pMemoize((code) =>
      fetchData<CatalogItem>(`/billing/catalog/code/${code}`)
        .then(({ data }) => data)
        .catch(() => null)
    ),
    []
  )

  function add(code: string) {
    setLoadingMap((map) =>
      produce(map, (map) => {
        map[code] = true
      })
    )
  }

  function remove(code: string) {
    setLoadingMap((map) =>
      produce(map, (map) => {
        delete map[code]
      })
    )
  }

  async function fetchCode(code: string) {
    if (loadingMap[code] !== undefined) {
      return null
    }

    try {
      add(code)
      return await doFetch(code)
    } finally {
      remove(code)
    }
  }

  return {
    loadingMap,
    fetchCode,
  }
}
