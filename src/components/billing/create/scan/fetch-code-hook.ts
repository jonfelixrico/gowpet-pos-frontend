import { CatalogItem } from '@/types/CatalogItem'
import { fetchData } from '@/utils/fetch-utils'

import { produce } from 'immer'
import pMemoize from 'p-memoize'
import { useMemo, useState } from 'react'

export default function useFetchCode() {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

  /*
   * We're using useMemo instead of useCallback here because the react linter is complaining and telling
   * us to "inline the function". Can't work around that since we want to use pMemoize's method.
   */
  const doFetch = useMemo(
    () =>
      pMemoize((code) =>
        fetchData<CatalogItem>(`/billing/catalog/code/${code}`)
          .then(({ data }) => data)
          .catch(() => null)
      ),
    []
  )

  function setValue(code: string, value: boolean) {
    setLoadingMap((map) =>
      produce(map, (map) => {
        map[code] = value
      })
    )
  }

  async function fetchCode(code: string) {
    if (loadingMap[code] !== undefined) {
      return null
    }

    try {
      setValue(code, true)
      return await doFetch(code)
    } finally {
      setValue(code, false)
    }
  }

  return {
    loadingMap,
    fetchCode,
  }
}
