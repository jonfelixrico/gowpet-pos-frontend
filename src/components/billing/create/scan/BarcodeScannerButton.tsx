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
import { Dispatch, SetStateAction } from 'react'
import { If, Then } from 'react-if'
import useBillingBarcodeScanner from './billing-barcode-scanner-hook'

interface BillingStateProps {
  billing: Billing
  setBilling: Dispatch<SetStateAction<Billing>>
}

export default function BarcodeScannerButton({
  billing,
  setBilling,
  ...buttonProps
}: BillingStateProps & ButtonProps) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { onDetect, barcodeColors } = useBillingBarcodeScanner({
    state: [billing, setBilling],
    loadingColor: 'red',
    doneColor: 'lightred',
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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
