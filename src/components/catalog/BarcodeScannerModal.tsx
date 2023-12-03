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
import BarcodeScannerControls from '../barcode/BarcodeScannerControls'
import { DetectionResults } from '../barcode/BarcodeScanner'
import Image from 'next/image'
import BarcodeBoundingBox from '../barcode/BarcodeBoundingBox'
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

  return (
    <>
      {/*
        The camera only shows if there are no scanned results yet.

        We only want to visually hide, not unrender. If we unrendered and need to show
        the camera again, there is a sort of a gap before the camera gets shown again
        because of the overhead. This is a bad UX.
      */}
      <Box aria-hidden={!!result} display={result ? 'none' : undefined}>
        <BarcodeScannerControls
          onDetect={processDetected}
          height="50dvh"
          isPaused={!!result}
        />
      </Box>

      <If condition={!!result}>
        <Then>
          <Flex direction="column" gap={2}>
            <ResultPreview {...(result as Detected)} />

            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="red" onClick={handleDiscard}>
              Discard
            </Button>
          </Flex>
        </Then>
      </If>
    </>
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
