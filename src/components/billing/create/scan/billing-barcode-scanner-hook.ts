import { DetectionResults } from '@/components/barcode/BarcodeScanner'
import { Billing } from '@/types/Billing'

import { produce } from 'immer'
import { mapValues } from 'lodash'
import { useMemo } from 'react'
import useFetchCode from './fetch-code-hook'
import { ReactState } from '@/types/react-types'
import { useToast } from '@chakra-ui/react'
import { Howl } from 'howler'

const BARCODE_SCAN_BEEP = new Howl({
  src: '/barcode-scan.wav',
})

export default function useBillingBarcodeScanner({
  state: [billing, setBilling],
  doneColor,
  loadingColor,
}: {
  state: ReactState<Billing>
  loadingColor: string
  doneColor: string
}) {
  const { items } = billing
  const codes = useMemo(
    () => new Set(items.map((item) => item.catalogItem.code).filter(Boolean)),
    [items]
  )

  const toast = useToast()

  const { fetchCode, loadingMap } = useFetchCode()

  async function onDetect(results: DetectionResults) {
    if (!results) {
      return
    }

    const [{ rawValue }] = results.barcodes

    if (!rawValue || codes.has(rawValue) || loadingMap[rawValue]) {
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

      BARCODE_SCAN_BEEP.play()
    } catch (e) {
      // TODO add something
    }
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
    () =>
      mapValues(loadingMap, (isLoading) =>
        isLoading ? loadingColor : doneColor
      ),
    [loadingMap, loadingColor, doneColor]
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
