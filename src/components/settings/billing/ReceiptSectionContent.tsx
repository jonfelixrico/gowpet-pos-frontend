'use client'

import { Button, Flex } from '@chakra-ui/react'
import { startTransition, useState } from 'react'
import ReceiptSettingsForm, { OnSubmitFunction } from './ReceiptSettingsForm'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import If from '@/components/common/If'

// Exported for testing
export function ReceiptSettingsCreate({
  onSave,
}: {
  onSave: OnSubmitFunction
}) {
  const [showForm, setShowForm] = useState(false)

  return (
    <Flex direction="column" gap={2} data-cy="create">
      <If condition={!showForm}>
        <Button
          colorScheme="blue"
          onClick={() => setShowForm(true)}
          data-cy="set-up"
        >
          Set-up receipt
        </Button>
      </If>

      <If condition={showForm}>
        <ReceiptSettingsForm onSubmit={onSave} data-cy="form" />

        <Button
          onClick={() => setShowForm(false)}
          variant="ghost"
          colorScheme="red"
          data-cy="abort"
        >
          Abort receipt set-up
        </Button>
      </If>
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
    <Flex direction="column" gap={2} data-cy="update">
      <ReceiptSettingsForm
        initialValues={settings}
        onSubmit={onSave}
        data-cy="form"
      />

      <Button
        onClick={triggerClear}
        variant="ghost"
        colorScheme="red"
        data-cy="clear"
      >
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
  settings?: ReceiptSettings
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
