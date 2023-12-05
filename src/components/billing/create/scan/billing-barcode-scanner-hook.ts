import { DetectionResults } from '@/components/barcode/BarcodeScanner'
import { Billing } from '@/types/Billing'

import { produce } from 'immer'
import { mapValues } from 'lodash'
import { useMemo } from 'react'
import useFetchCode from './fetch-code-hook'
import { UseStateOutput } from '@/types/react-types'
import { useToast } from '@chakra-ui/react'

export default function useBillingBarcodeScanner({
  state: [billing, setBilling],
}: {
  state: UseStateOutput<Billing>
}) {
  const { items } = billing
  const codes = useMemo(
    () => new Set(items.map((item) => item.catalogItem.code).filter(Boolean)),
    [items]
  )

  const toast = useToast()

  const { fetchCode, loadingMap } = useFetchCode()
  async function detect({ rawValue }: DetectedBarcode) {
    if (codes.has(rawValue) || loadingMap[rawValue]) {
      return
    }

    try {
      const data = await fetchCode(rawValue)
      if (!data) {
        return
      }

      toast({
        title: `Scanned ${data.name}`,
      })

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
    () => mapValues(loadingMap, (value) => (value ? 'red' : 'lightred')),
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
