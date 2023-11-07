import { apiFetchData } from '@/server-utils/resource-api-util'
import { Billing } from '@/types/Billing'
import { Box, Text } from '@chakra-ui/react'

export default async function BillingListPage() {
  const { data: billings } = await apiFetchData<Billing[]>('/billing')
  return (
    <Box>
      {billings.map((billing, index) => (
        <Text key={index}>{JSON.stringify(billing)}</Text>
      ))}
    </Box>
  )
}
