'use client'

import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import CloseModalContext from './CloseModalContext'

export default function CreateUserDialogLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  function onClose() {
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={() => router.replace('/settings/user')}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent data-cy="create-dialog">
        <CloseModalContext.Provider value={onClose}>
          {children}
        </CloseModalContext.Provider>
      </ModalContent>
    </Modal>
  )
}
