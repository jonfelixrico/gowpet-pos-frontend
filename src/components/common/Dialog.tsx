import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type DialogButtonProps = Omit<ButtonProps, 'onClick' | 'children'> & {
  label?: ReactNode
}

export default function Dialog({
  onCancel,
  onOk,
  onDismiss,
  isOpen,
  header,
  body,
  cancel,
  ok,
}: {
  onCancel: () => void
  onOk: () => void
  onDismiss: () => void
  isOpen: boolean
  header?: ReactNode
  body?: ReactNode
  ok?: DialogButtonProps
  cancel?: DialogButtonProps
}) {
  const { label: cancelLabel, ...cancelProps } = cancel ?? {}
  const { label: okLabel, ...okProps } = ok ?? {}

  return (
    <Modal isOpen={isOpen} onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button {...cancelProps} onClick={onCancel}>
            {cancel?.label ?? 'Cancel'}
          </Button>

          <Button {...okProps} onClick={onOk}>
            {ok?.label ?? 'Ok'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
