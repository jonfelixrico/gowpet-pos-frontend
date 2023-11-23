import { ReceiptSettings } from '@/types/ReceiptSetings'
import { Button, Flex } from '@chakra-ui/react'
import ReceiptSettingsForm from './ReceiptSettingsForm'
import { startTransition } from 'react'

export default function ReceiptSettingsUpdate({
  save,
  clear,
  settings,
}: {
  save: (settings: ReceiptSettings) => Promise<void>
  clear: () => Promise<void>
  settings: ReceiptSettings
}) {
  function triggerClear() {
    startTransition(() => {
      clear()
    })
  }

  return (
    <Flex direction="column" gap={2}>
      <ReceiptSettingsForm initialValues={settings} onSubmit={save} />

      <Button onClick={triggerClear} variant="ghost" colorScheme="red">
        Clear receipt settings
      </Button>
    </Flex>
  )
}
