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

type OkButtonProps = DialogButtonProps | ((value: () => void) => ReactNode)

function OkButton({
  onClick,
  innerProps,
}: {
  innerProps?: OkButtonProps
  onClick: () => void
}) {
  if (typeof innerProps === 'function') {
    return innerProps(onClick)
  }

  const { content, ...others } = innerProps ?? {}
  return (
    <Button {...others} onClick={onClick} ml={3} data-cy="ok">
      {content ?? 'Ok'}
    </Button>
  )
}

export default function ConfirmDialog({
  onCancel = EMPTY_FN,
  onOk = EMPTY_FN,
  onDismiss = EMPTY_FN,
  isOpen,
  header,
  children,
  cancel: cancel,
  ok,
}: {
  onCancel?: () => void
  onOk?: () => void
  onDismiss?: () => void
  isOpen?: boolean
  header?: ReactNode
  children?: ReactNode
  ok?: OkButtonProps
  cancel?: DialogButtonProps
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const { content: cancelContent, ...cancelProps } = cancel ?? {}

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

            <OkButton onClick={onOk} innerProps={ok} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
