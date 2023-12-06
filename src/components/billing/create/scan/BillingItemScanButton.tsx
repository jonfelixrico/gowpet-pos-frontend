import BarcodeScannerControls from '@/components/barcode/BarcodeScannerControls'
import { Billing } from '@/types/Billing'
import {
  Button,
  IconButton,
  IconButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import useBillingBarcodeScanner from './billing-barcode-scanner-hook'
import { ReactState } from '@/types/react-types'
import { BsUpcScan } from 'react-icons/bs'

export default function BillingItemScanButton({
  state: [billing, setBilling],
  ...buttonProps
}: {
  state: ReactState<Billing>
} & Omit<IconButtonProps, 'children' | 'aria-label'>) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { onDetect, barcodeColors } = useBillingBarcodeScanner({
    state: [billing, setBilling],
    loadingColor: 'red',
    doneColor: 'lightred',
  })

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{
          base: 'full',
          sm: 'lg',
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scanner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BarcodeScannerControls
              onDetect={onDetect}
              previewOptions={{
                barcodeColors,
                color: 'green',
              }}
              options={{
                max: 1,
                isPaused: !isOpen,
                formats: [
                  'ean_13',
                  'ean_8',
                  'itf',
                  'upc_a',
                  'upc_e',
                  'qr_code',
                ],
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="outline">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <IconButton {...buttonProps} onClick={onOpen} aria-label="Scan barcode">
        <BsUpcScan />
      </IconButton>
    </>
  )
}
