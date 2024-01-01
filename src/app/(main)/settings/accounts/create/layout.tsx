'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'

export default function CreateAccountDialogLayout({
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
      onCloseComplete={() => router.back()}
      size="xl"
    >
      <ModalOverlay />
      {/* TODO provide close method here */}
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
}
