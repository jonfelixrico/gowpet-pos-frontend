import BarcodeScannerControls from '@/components/barcode/BarcodeScannerControls'
import { Billing } from '@/types/Billing'
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
  useDisclosure,
} from '@chakra-ui/react'
import { If, Then } from 'react-if'
import useBillingBarcodeScanner from './billing-barcode-scanner-hook'
import { ReactState } from '@/types/react-types'

export default function BarcodeScannerButton({
  state: [billing, setBilling],
  ...buttonProps
}: {
  state: ReactState<Billing>
} & ButtonProps) {
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
            <If condition={isOpen}>
              <Then>
                <BarcodeScannerControls
                  onDetect={onDetect}
                  previewOptions={{
                    barcodeColors,
                    color: 'green',
                  }}
                  options={{
                    max: 1,
                  }}
                />
              </Then>
            </If>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Button {...buttonProps} size="sm" onClick={onOpen}>
        Barcode Scanner
      </Button>
    </>
  )
}
