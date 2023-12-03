'use client'

import {
  Box,
  Button,
  Center,
  Code,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import BarcodeScannerControls from './BarcodeScannerControls'
import { DetectionResults } from './BarcodeCamera'
import Image from 'next/image'
import BarcodeBoundingBox from './BarcodeBoundingBox'
import { Howl } from 'howler'
import { If, Then } from 'react-if'

type Detected = Omit<DetectionResults, 'barcodes'> & {
  barcode: DetectedBarcode
}

function ResultPreview(result: Detected) {
  const { barcode, image, ...dimensions } = result

  return (
    <Flex direction="column" gap={2}>
      <Box>
        <Box width="fit-content" height="fit-content" position="relative">
          <Box width="fit-content" height="fit-content" position="absolute">
            <BarcodeBoundingBox {...result} color="green" />
          </Box>

          <Image src={image} alt="Detected barcode" {...dimensions} />
        </Box>
      </Box>

      <Center>
        <Box>
          <Text fontWeight="bold">Scanned:</Text>{' '}
          <Code>{result.barcode.rawValue}</Code>
        </Box>
      </Center>
    </Flex>
  )
}

const BARCODE_SCAN_BEEP = new Howl({
  src: '/barcode-scan.wav',
})

function Content({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [result, setResult] = useState<Detected>()

  function processDetected({ barcodes, ...others }: DetectionResults) {
    BARCODE_SCAN_BEEP.play()
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
    return <BarcodeScannerControls onDetect={processDetected} height="50dvh" />
  }

  return (
    <Flex direction="column" gap={2}>
      <ResultPreview {...result} />

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
            <Then>
              <Content onSubmit={handleSubmit} />
            </Then>
          </If>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
