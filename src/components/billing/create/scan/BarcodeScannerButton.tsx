import { DetectionResults } from '@/components/barcode/BarcodeScanner'
import BarcodeScannerControls from '@/components/barcode/BarcodeScannerControls'
import { Billing } from '@/types/Billing'
import { CatalogItem } from '@/types/CatalogItem'
import { fetchData } from '@/utils/fetch-utils'
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
import { produce } from 'immer'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { If, Then } from 'react-if'

interface BillingStateProps {
  billing: Billing
  setBilling: Dispatch<SetStateAction<Billing>>
}

function useScan({ billing, setBilling }: BillingStateProps) {
  const { items } = billing

  const codes = useMemo(
    () => items.map((item) => item.catalogItem.code).filter(Boolean),
    [items]
  )
  const codesSet = useMemo(() => new Set(codes), [codes])

  const [loadingCodes, setLoadingCodes] = useState<Record<string, boolean>>({})

  async function detect({ rawValue }: DetectedBarcode) {
    if (codesSet.has(rawValue) || loadingCodes[rawValue]) {
      return
    }

    try {
      setLoadingCodes((codes) =>
        produce(codes, (codes) => {
          codes[rawValue] = true
        })
      )

      const { data } = await fetchData<CatalogItem>(
        `/billing/catalog/code/${rawValue}`
      )

      setBilling((billing) =>
        produce(billing, (billing) => {
          billing.items.push({
            catalogItem: data,
            quantity: 1,
          })
        })
      )
    } catch (e) {
      // TODO add something
    } finally {
      setLoadingCodes((codes) =>
        produce(codes, (codes) => {
          delete codes[rawValue]
        })
      )
    }
  }

  function onDetect({ barcodes }: DetectionResults) {
    Promise.all(barcodes.map(detect))
  }

  const selectedColors = useMemo(() => {
    return codes.reduce(
      (map, code) => {
        if (code) {
          map[code] = 'gray'
        }

        return map
      },
      {} as Record<string, string>
    )
  }, [codes])

  const loadingColors = useMemo(() => {
    const colors: Record<string, string> = {}
    for (const key in loadingCodes) {
      if (loadingCodes[key]) {
        colors[key] = 'orange'
      }
    }
    return colors
  }, [loadingCodes])

  return {
    barcodeColors: useMemo(() => {
      return {
        ...loadingColors,
        ...selectedColors,
      }
    }, [loadingColors, selectedColors]),
    onDetect,
  }
}

export default function BarcodeScannerButton({
  billing,
  setBilling,
  ...buttonProps
}: BillingStateProps & ButtonProps) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { onDetect, barcodeColors } = useScan({ billing, setBilling })

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
                  color="green"
                  barcodeColors={barcodeColors}
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
