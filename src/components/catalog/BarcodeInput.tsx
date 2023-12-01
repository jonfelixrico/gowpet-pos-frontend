'use client'

import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import If from '../common/If'
import { useZxing } from 'react-zxing'

function BarcodeScannerModal({
  isOpen,
  onClose,
  onScan,
  ...props
}: ModalProps & {
  onScan: (code: string) => void
}) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText())
    },
  })

  return (
    <Modal {...props} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Barcode/QR Scanner</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <If condition={isOpen}>
            <video ref={ref} />
          </If>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function BarcodeInput({ onInput, ...props }: InputProps) {
  return (
    <InputGroup>
      <Input {...props} onInput={onInput} />
      <InputRightElement></InputRightElement>
    </InputGroup>
  )
}
