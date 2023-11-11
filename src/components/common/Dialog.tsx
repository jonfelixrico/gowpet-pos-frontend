import {
  Button,
  ButtonProps,
  Divider,
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
  content?: ReactNode
}

export default function Dialog({
  onCancel,
  onOk,
  onDismiss,
  isOpen,
  header,
  children,
  cancel,
  ok,
}: {
  onCancel: () => void
  onOk: () => void
  onDismiss: () => void
  isOpen: boolean
  header?: ReactNode
  children?: ReactNode
  ok?: DialogButtonProps
  cancel?: DialogButtonProps
}) {
  const { content: cancelContent, ...cancelProps } = cancel ?? {}
  const { content: okContent, ...okProps } = ok ?? {}

  return (
    <Modal isOpen={isOpen} onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />

        <Divider />

        <ModalBody paddingY={5}>{children}</ModalBody>

        <Divider />

        <ModalFooter gap={2}>
          <Button {...cancelProps} onClick={onCancel}>
            {cancel?.content ?? 'Cancel'}
          </Button>

          <Button {...okProps} onClick={onOk}>
            {ok?.content ?? 'Ok'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
