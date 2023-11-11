import { EMPTY_FN } from '@/utils/misc-utills'
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
  onCancel = EMPTY_FN,
  onOk = EMPTY_FN,
  onDismiss = EMPTY_FN,
  isOpen,
  header,
  children,
  cancel,
  ok,
}: {
  onCancel?: () => void
  onOk?: () => void
  onDismiss?: () => void
  isOpen?: boolean
  header?: ReactNode
  children?: ReactNode
  ok?: DialogButtonProps
  cancel?: DialogButtonProps
}) {
  const { content: cancelContent, ...cancelProps } = cancel ?? {}
  const { content: okContent, ...okProps } = ok ?? {}

  return (
    <Modal isOpen={!!isOpen} onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader data-cy="header">{header}</ModalHeader>
        <ModalCloseButton />

        <Divider />

        <ModalBody paddingY={5} data-cy="body">
          {children}
        </ModalBody>

        <Divider />

        <ModalFooter gap={2}>
          <Button {...cancelProps} onClick={onCancel} data-cy="cancel">
            {cancel?.content ?? 'Cancel'}
          </Button>

          <Button {...okProps} onClick={onOk} data-cy="ok">
            {ok?.content ?? 'Ok'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
