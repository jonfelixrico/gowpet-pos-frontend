import { apiFetchData } from '@/server-utils/resource-api-util'
import { Billing } from '@/types/Billing'
import { FetchError } from '@/utils/fetch-utils'
import { Box } from '@chakra-ui/react'
import { notFound } from 'next/navigation'

export default async function Billing({
  params,
}: {
  params: {
    id: string
  }
}) {
  let data: Billing
  try {
    const response = await apiFetchData(`/billing/${params.id}`)
    data = response.data
  } catch (e) {
    if (e instanceof FetchError && e.response.status === 404) {
      notFound()
    }

    throw e
  }

  // TODO implement the actual content
  return <Box>{JSON.stringify(data)}</Box>
}
