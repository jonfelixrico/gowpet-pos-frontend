'use client'

import { Button, Flex } from '@chakra-ui/react'
import { startTransition, useState } from 'react'
import ReceiptSettingsForm, { OnSubmitFunction } from './ReceiptSettingsForm'
import { ReceiptSettings } from '@/types/ReceiptSetings'

// Exported for testing
export function ReceiptSettingsCreate({
  onSave,
}: {
  onSave: OnSubmitFunction
}) {
  const [showForm, setShowForm] = useState(false)

  if (!showForm) {
    return (
      <Button colorScheme="blue" onClick={() => setShowForm(true)}>
        Set-up receipt
      </Button>
    )
  }

  return (
    <Flex direction="column" gap={2}>
      <ReceiptSettingsForm
        initialValues={{
          address: '',
          contactNo: '',
          header: '',
          snsLink: '',
          snsMessage: '',
        }}
        onSubmit={onSave}
      />

      <Button
        onClick={() => setShowForm(false)}
        variant="ghost"
        colorScheme="red"
      >
        Abort receipt set-up
      </Button>
    </Flex>
  )
}

// Exported for testing
export function ReceiptSettingsUpdate({
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

export default function ReceiptSectionContent({
  onSave,
  onClear,
  settings,
}: {
  onSave: OnSubmitFunction
  onClear: () => Promise<void>
  settings: ReceiptSettings
}) {
  if (!settings) {
    return <ReceiptSettingsCreate onSave={onSave} />
  }

  return (
    <ReceiptSettingsUpdate
      onClear={onClear}
      onSave={onSave}
      settings={settings}
    />
  )
}
