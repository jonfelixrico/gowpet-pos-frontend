'use client'

import {
  Box,
  Button,
  Flex,
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
import Image from 'next/image'
import BarcodeBoundingBox from './BarcodeBoundingBox'

type Detected = Omit<DetectionResults, 'barcodes'> & {
  barcode: DetectedBarcode
}

function Content({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [result, setResult] = useState<Detected>()

  function processDetected({ barcodes, ...others }: DetectionResults) {
    setResult({
      ...others,
      barcode: barcodes[0],
    })
  }

  function handleSubmit() {
    if (!result) {
      return
    }

    onSubmit(result.barcode.rawValue)
  }

  function handleDiscard() {
    setResult(undefined)
  }

  if (!result) {
    return <BarcodeScanner onDetect={processDetected} height="50dvh" />
  }

  const { barcode, image, ...dimensions } = result
  return (
    <Flex direction="column">
      <Box>
        <Box width="fit-content" height="fit-content" position="relative">
          <Box width="fit-content" height="fit-content" position="absolute">
            <BarcodeBoundingBox {...result} color="green" />
          </Box>

          <Image src={image} alt="Detected barcode" {...dimensions} />
        </Box>
      </Box>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
      <Button colorScheme="red" onClick={handleDiscard}>
        Discard
      </Button>
    </Flex>
  )
}

export default function BarcodeScannerModal({
  isOpen,
  onClose,
  onSubmit,
  ...props
}: Omit<ModalProps, 'children'> & {
  onSubmit: (code: string) => void
}) {
  function handleSubmit(code: string) {
    onSubmit(code)
    onClose()
  }

  return (
    <Modal {...props} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Barcode/QR Scanner</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <If condition={isOpen}>
            <Content onSubmit={handleSubmit} />
          </If>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
