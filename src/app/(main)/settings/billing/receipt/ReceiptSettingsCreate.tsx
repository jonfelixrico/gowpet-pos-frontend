'use client'

import { ReceiptSettings } from '@/types/ReceiptSetings'
import { Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import ReceiptSettingsForm from './ReceiptSettingsForm'

export default function ReceiptSettingsCreate({
  save,
}: {
  save: (settings: ReceiptSettings) => Promise<void>
}) {
  const [showForm, setShowForm] = useState(false)

  if (showForm) {
    return <Button onClick={() => setShowForm(true)}>Set-up receipt</Button>
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
        onSubmit={save}
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
