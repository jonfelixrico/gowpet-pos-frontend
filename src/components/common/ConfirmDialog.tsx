/* eslint-disable react/no-unescaped-entities */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
} from '@chakra-ui/react'
import { ReactNode, useRef } from 'react'

export default function ConfirmDialog({
  onCancel,
  onOk,
  onDismiss,
  isOpen,
  title,
  message,
  cancel,
  ok,
}: {
  onCancel: () => void
  onOk: () => void
  onDismiss: () => void
  isOpen: boolean
  title?: ReactNode
  message?: ReactNode
  ok?: {
    label?: ReactNode
    colorScheme?: ButtonProps['colorScheme']
  }
  cancel?: {
    label?: ReactNode
  }
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onDismiss}
      isOpen={isOpen}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" data-cy="title">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody data-cy="message">{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel} data-cy="cancel">
              {cancel?.label === undefined ? 'Cancel' : cancel.label}
            </Button>

            <Button
              colorScheme={ok?.colorScheme}
              /*
               * idForDeletion will never be null since this dialog will be hidden if it's null
               * hidden dialog = button cannot be clicked
               */
              onClick={onOk}
              ml={3}
              data-cy="ok"
            >
              {ok?.label === undefined ? 'Ok' : ok.label}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
