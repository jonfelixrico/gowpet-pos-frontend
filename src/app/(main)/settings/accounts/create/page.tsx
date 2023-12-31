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
import { useState } from 'react'

export default function CreateAccountModal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onCloseComplete={() => router.back()}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Test</ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button colorScheme="blue">Create Account</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
