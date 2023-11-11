/* eslint-disable react/no-unescaped-entities */
import { EMPTY_FN } from '@/utils/misc-utills'
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

interface ConfirmDialogProps {
  onCancel?: () => void
  onOk?: () => void
  onDismiss?: () => void
  isOpen?: boolean
  header?: ReactNode
  children?: ReactNode

  cancel?: DialogButtonProps
  ok?: DialogButtonProps
}

export default function ConfirmDialog({
  onCancel = EMPTY_FN,
  onOk = EMPTY_FN,
  onDismiss = EMPTY_FN,
  isOpen,
  header,
  children,
  cancel,
  ok,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const { content: cancelContent, ...cancelProps } = cancel ?? {}
  const { content: okContent, ...okProps } = ok ?? {}

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onDismiss}
      isOpen={!!isOpen}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" data-cy="header">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody data-cy="body">{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              {...cancelProps}
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
