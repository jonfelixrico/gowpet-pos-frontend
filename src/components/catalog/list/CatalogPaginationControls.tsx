import { PaginationControls } from '@/components/pagination/PaginationControls'

export function CatalogPaginationControls({
  pageCount,
  pageNo,
  additionalQuery,
}: {
  pageNo: number
  pageCount: number
  additionalQuery?: Record<string, string>
}) {
  function buildHref(pageNo: number) {
    return {
      pathname: '/catalog',
      query: {
        ...additionalQuery,
        pageNo,
      },
    }
  }

  return (
    <PaginationControls
      hrefBuilder={buildHref}
      pageCount={pageCount}
      pageNo={pageNo}
    />
  )
}
