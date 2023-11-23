import If from '@/components/common/If'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import { Divider, Flex, Text } from '@chakra-ui/react'
import ReceiptSettingsUpdate from './ReceiptSettingsUpdate'
import ReceiptSettingsCreate from './ReceiptSettingsCreate'

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
  }

  async function clear() {
    'use server'
    await apiFetchData('/billing/receipt', {
      method: 'DELETE',
    })
  }

  return (
    <Flex gap={2} direction="column">
      <Text fontWeight="medium" fontSize="lg">
        Receipt
      </Text>

      <Divider />

      <If condition={!!data}>
        <ReceiptSettingsUpdate clear={clear} save={save} settings={data} />
      </If>

      <If condition={!data}>
        <ReceiptSettingsCreate save={save} />
      </If>
    </Flex>
  )
}
