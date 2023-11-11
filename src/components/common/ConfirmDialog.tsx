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

function OkButton({
  onClick,
  innerProps,
}: {
  innerProps?: DialogButtonProps
  onClick: () => void
}) {
  const { content, ...others } = innerProps ?? {}
  return (
    <Button {...others} onClick={onClick} ml={3} data-cy="ok">
      {content ?? 'Ok'}
    </Button>
  )
}

interface BaseConfirmDialogProps {
  onCancel?: () => void
  onOk?: () => void
  onDismiss?: () => void
  isOpen?: boolean
  header?: ReactNode
  children?: ReactNode

  cancel?: DialogButtonProps
}

interface ConfirmDialogProps extends BaseConfirmDialogProps {
  okComponent: undefined
  ok?: DialogButtonProps
}

interface ConfirmDialogPropsWithCustomOk extends BaseConfirmDialogProps {
  okComponent: ReactNode
  ok: undefined
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
  okComponent,
}: ConfirmDialogProps | ConfirmDialogPropsWithCustomOk) {
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

            {!!okComponent ? (
              okComponent
            ) : (
              <OkButton onClick={onOk} innerProps={ok} />
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
