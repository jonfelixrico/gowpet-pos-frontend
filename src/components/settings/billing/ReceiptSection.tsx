import { apiFetchData } from '@/server-utils/resource-api-util'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import { Divider, Flex, Text } from '@chakra-ui/react'
import { RedirectType, redirect } from 'next/navigation'
import ReceiptSectionContent from './ReceiptSectionContent'

export default async function ReceiptSection() {
  const { data } = await apiFetchData<ReceiptSettings>('/billing/receipt')

  async function save(settings: ReceiptSettings) {
    'use server'

    await apiFetchData('/billing/receipt', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    })
    redirect('/settings/billing', RedirectType.replace)
  }

  async function clear() {
    'use server'
    await apiFetchData('/billing/receipt', {
      method: 'DELETE',
    })
    redirect('/settings/billing', RedirectType.replace)
  }

  return (
    <Flex gap={2} direction="column">
      <Text fontWeight="medium" fontSize="xl">
        Receipt
      </Text>

      <Divider />

      <ReceiptSectionContent onClear={clear} onSave={save} settings={data} />
    </Flex>
  )
}
