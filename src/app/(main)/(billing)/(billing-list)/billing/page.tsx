import { apiFetchData } from '@/server-utils/resource-api-util'
import { Box, Flex } from '@chakra-ui/react'
import { stringify } from 'querystring'
import BillingListItem from './BillingListItem'
import { SavedBilling } from '../../BillingDetailsData'
import {
  PaginationControls,
  Url,
} from '@/components/pagination/PaginationControls'

export default async function BillingListPage({
  searchParams: { pageNo = '1' },
}: {
  searchParams: {
    /**
     * Base 1
     */
    pageNo?: string
  }
}) {
  // Math.max ensuress that the min value of parsedPageNo is 1
  const parsedPageNo = Math.max(parseInt(pageNo), 1)

  const queryParams = stringify({
    pageNo: parsedPageNo - 1, // we're doing -1 because the BE is base 0
    itemCount: 10,
  })
  const { data, headers } = await apiFetchData<SavedBilling[]>(
    `/billing?${queryParams}`
  )

  const xTotalCount = headers.get('X-Total-Count')
  if (xTotalCount === null) {
    throw new Error('X-Total-Count was not found in the backend response')
  }

  function hrefBuilder(pageNo: number): Url {
    return {
      pathname: '/billing',
      query: {
        pageNo,
      },
    }
  }

  return (
    <Flex direction="column" gap={2} width="full">
      <PaginationControls
        hrefBuilder={hrefBuilder}
        pageCount={parseInt(xTotalCount)}
        pageNo={parsedPageNo}
      />

      {/* TODO implement listing */}
      {data.map((billing) => (
        <BillingListItem billing={billing} key={billing.id} />
      ))}
    </Flex>
  )
}
