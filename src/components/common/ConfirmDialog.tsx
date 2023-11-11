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

type DialogButtonProps = {
  content?: ReactNode
} & Omit<ButtonProps, 'children' | 'onClick'>

export default function ConfirmDialog({
  onCancel,
  onOk,
  onDismiss,
  isOpen,
  title,
  message,
  cancel: cancel,
  ok,
}: {
  onCancel: () => void
  onOk: () => void
  onDismiss: () => void
  isOpen: boolean
  title?: ReactNode
  message?: ReactNode
  ok?: DialogButtonProps
  cancel?: DialogButtonProps
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const { content: cancelContent, ...cancelProps } = cancel ?? {}
  const { content: okContent, ...okProps } = ok ?? {}

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
            <Button
              {...okProps}
              ref={cancelRef}
              onClick={onCancel}
              data-cy="cancel"
            >
              {cancelContent ?? 'Cancel'}
            </Button>

            <Button {...okProps} onClick={onOk} ml={3} data-cy="ok">
              {okContent ?? 'Ok'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
