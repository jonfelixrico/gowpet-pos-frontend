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
  useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import BarcodeScanner from './BarcodeScanner'
import { DetectionResults } from './BarcodeCamera'
import If from '@/components/common/If'

function BarcodeScannerModal({
  isOpen,
  onClose,
  onScan,
  ...props
}: Omit<ModalProps, 'children'> & {
  onScan: (code: string) => void
}) {
  const [result, setResult] = useState('')

  function onBarcodeDetect({ barcodes, image }: DetectionResults) {
    const { rawValue } = barcodes[0]
    setResult(rawValue)
  }

  return (
    <Modal {...props} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Barcode/QR Scanner</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <If condition={isOpen}>
            <BarcodeScanner onDetect={onBarcodeDetect} height="50dvh" />
          </If>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>

          <Button
            colorScheme="blue"
            onClick={() => onScan(result)}
            isDisabled={!result}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function BarcodeInput(props: InputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const ref = useRef<HTMLInputElement | null>(null)

  function propagateAsChangeEvent(code: string) {
    const el = ref.current
    if (!el) {
      // TODO remove this
      console.debug('el not found')
      return
    }

    el.value = code
    el.dispatchEvent(new Event('change'))
  }

  return (
    <InputGroup>
      <Input {...props} ref={ref} />
      <InputRightElement>
        <Button onClick={onOpen}>Use Scanner</Button>

        <BarcodeScannerModal
          isOpen={isOpen}
          onClose={onClose}
          onScan={propagateAsChangeEvent}
        />
      </InputRightElement>
    </InputGroup>
  )
}
