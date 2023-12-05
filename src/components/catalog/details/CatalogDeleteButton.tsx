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
      {/* Using button onClick with `onDelete` as a server action doesn't seem to work... it has to be a form */}
      <form action={promptDelete}>
        <Button type="submit" colorScheme="red" data-cy="delete">
          Delete
        </Button>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-cy="delete-dialog" data-open={isOpen}>
          <ModalHeader>Delete Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this item? This action cannot be
            undone
          </ModalBody>

          <ModalFooter gap={2}>
            <Button colorScheme="red" onClick={confirmDelete} data-cy="submit">
              Yes, delete
            </Button>

            <Button variant="ghost" onClick={onClose} data-cy="cancel">
              No, cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
