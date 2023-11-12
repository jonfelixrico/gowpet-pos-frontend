import { apiFetchData } from '@/server-utils/resource-api-util'
import { Box, Flex } from '@chakra-ui/react'
import { stringify } from 'querystring'
import BillingListItem from './BillingListItem'
import { SavedBilling } from '../../BillingDetailsData'

export default async function BillingListPage({
  searchParams,
}: {
  searchParams: {
    pageNo?: string
  }
}) {
  const queryParams = stringify({
    pageNo: searchParams.pageNo ?? '0',
  })
  const { data, headers } = await apiFetchData<SavedBilling[]>(
    `/billing?${queryParams}`
  )

  const xTotalCount = headers.get('X-Total-Count')
  if (xTotalCount === null) {
    throw new Error('X-Total-Count was not found in the backend response')
  }
  const pageCount = parseInt(xTotalCount)

  return (
    <Flex direction="column" gap={2} width="full">
      {/* TODO implement listing */}
      {data.map((billing) => (
        <BillingListItem billing={billing} key={billing.id} />
      ))}
    </Flex>
  )
}
