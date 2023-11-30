'use client'

import { ReceiptSettings } from '@/types/ReceiptSetings'
import { Button, Flex } from '@chakra-ui/react'
import ReceiptSettingsForm, { OnSubmitFunction } from './ReceiptSettingsForm'
import { startTransition } from 'react'

export default function ReceiptSettingsUpdate({
  onSave,
  onClear,
  settings,
}: {
  onSave: OnSubmitFunction
  onClear: () => Promise<void>
  settings: ReceiptSettings
}) {
  function triggerClear() {
    startTransition(() => {
      onClear()
    })
  }

  return (
    <Flex direction="column" gap={2}>
      <ReceiptSettingsForm initialValues={settings} onSubmit={onSave} />

      <Button onClick={triggerClear} variant="ghost" colorScheme="red">
        Clear receipt settings
      </Button>
    </Flex>
  )
}
