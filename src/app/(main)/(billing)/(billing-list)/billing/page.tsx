import { apiFetchData } from '@/server-utils/resource-api-util'
import { Billing } from '@/types/Billing'
import { Box, Text } from '@chakra-ui/react'
import { stringify } from 'querystring'

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
  const { data, headers } = await apiFetchData<Billing[]>(
    `/billing?${queryParams}`
  )

  const xTotalCount = headers.get('X-Total-Count')
  if (xTotalCount === null) {
    throw new Error('X-Total-Count was not found in the backend response')
  }
  const pageCount = parseInt(xTotalCount)

  return (
    <Box>
      {/* TODO implement listing */}
      {data.map((billing, index) => (
        <Text key={index}>{JSON.stringify(billing)}</Text>
      ))}
    </Box>
  )
}
