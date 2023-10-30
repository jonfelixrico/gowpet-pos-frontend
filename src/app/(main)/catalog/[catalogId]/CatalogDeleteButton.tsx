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
  useDisclosure,
} from '@chakra-ui/react'

export default function CatalogDeleteButton(props: {
  onDelete: () => Promise<void>
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function promptDelete() {
    onOpen()
  }

  async function confirmDelete() {
    onClose()
    await props.onDelete()
  }

  return (
    <>
      {/* Looks like server actions doesn't work with the onClick handler... it has to be form actions */}
      <form action={promptDelete}>
        <Button type="submit">Delete</Button>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this item? This action cannot be
            undone
          </ModalBody>

          <ModalFooter gap={2}>
            <Button colorScheme="red" onClick={confirmDelete}>
              Yes, delete
            </Button>

            <Button variant="ghost" onClick={onClose}>
              No, cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
