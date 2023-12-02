'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { useState } from 'react'
import BarcodeScanner from './BarcodeScanner'
import { DetectionResults } from './BarcodeCamera'
import If from '@/components/common/If'

type Detected = Omit<DetectionResults, 'barcodes'> & {
  barcode: DetectedBarcode
}

export default function BarcodeInputModal({
  isOpen,
  onClose,
  onScan,
  ...props
}: Omit<ModalProps, 'children'> & {
  onScan: (code: string) => void
}) {
  const [result, setResult] = useState<Detected>()

  function onBarcodeDetect({ barcodes, ...others }: DetectionResults) {
    setResult({
      ...others,
      barcode: barcodes[0],
    })
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
            onClick={() => onScan(result?.barcode.rawValue as string)}
            isDisabled={!result}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
