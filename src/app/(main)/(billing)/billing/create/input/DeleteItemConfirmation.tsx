/* eslint-disable react/no-unescaped-entities */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

export default function DeleteItemConfirmation({
  onConfirm,
  idForDeletion,
  onClose,
}: {
  onConfirm: (id: string) => void
  onClose: () => void
  idForDeletion: string | null
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={!!idForDeletion}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remove Item
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to remove this item?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>

            <Button
              colorScheme="red"
              /*
               * idForDeletion will never be null since this dialog will be hidden if it's null
               * hidden dialog = button cannot be clicked
               */
              onClick={() => onConfirm(idForDeletion as string)}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
