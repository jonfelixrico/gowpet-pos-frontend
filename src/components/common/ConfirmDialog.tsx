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
  cancelLabel,
  okLabel,
  okColorScheme,
}: {
  onCancel: () => void
  onOk: () => void
  onDismiss: () => void
  isOpen: boolean
  title?: ReactNode
  message?: ReactNode
  cancelLabel?: ReactNode
  okLabel?: ReactNode
  okColorScheme?: ButtonProps['colorScheme']
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
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              {cancelLabel}
            </Button>

            <Button
              colorScheme={okColorScheme}
              /*
               * idForDeletion will never be null since this dialog will be hidden if it's null
               * hidden dialog = button cannot be clicked
               */
              onClick={onOk}
              ml={3}
            >
              {okLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
