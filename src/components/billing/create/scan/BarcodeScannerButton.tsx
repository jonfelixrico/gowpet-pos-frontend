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
import { mapValues } from 'lodash'
import pMemoize from 'p-memoize'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { If, Then } from 'react-if'

interface BillingStateProps {
  billing: Billing
  setBilling: Dispatch<SetStateAction<Billing>>
}

function useCodeFetch() {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const doFetch = useCallback(
    pMemoize((code) =>
      fetchData<CatalogItem>(`/billing/catalog/code/${code}`)
        .then(({ data }) => data)
        .catch(() => null)
    ),
    []
  )

  function add(code: string) {
    setLoadingMap((map) =>
      produce(map, (map) => {
        map[code] = true
      })
    )
  }

  function remove(code: string) {
    setLoadingMap((map) =>
      produce(map, (map) => {
        delete map[code]
      })
    )
  }

  async function fetchCode(code: string) {
    if (loadingMap[code] !== undefined) {
      return null
    }

    try {
      add(code)
      return await doFetch(code)
    } finally {
      remove(code)
    }
  }

  return {
    loadingMap,
    fetchCode,
  }
}

function useScan({ billing, setBilling }: BillingStateProps) {
  const { items } = billing

  const { fetchCode, loadingMap } = useCodeFetch()

  const codes = useMemo(
    () => new Set(items.map((item) => item.catalogItem.code).filter(Boolean)),
    [items]
  )

  async function detect({ rawValue }: DetectedBarcode) {
    if (codes.has(rawValue) || loadingMap[rawValue]) {
      return
    }

    try {
      const data = await fetchCode(rawValue)
      if (!data) {
        return
      }

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
    }
  }

  async function onDetect({ barcodes }: DetectionResults) {
    const [barcode] = barcodes
    await detect(barcode)
  }

  const selectedColors = useMemo(() => {
    return Array.from(codes).reduce(
      (map, code) => {
        if (code) {
          map[code] = 'gray'
        }

        return map
      },
      {} as Record<string, string>
    )
  }, [codes])

  const loadingColors = useMemo(
    () => mapValues(loadingMap, (value) => (value ? 'red' : 'pink')),
    [loadingMap]
  )

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
                  previewOptions={{
                    barcodeColors,
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
