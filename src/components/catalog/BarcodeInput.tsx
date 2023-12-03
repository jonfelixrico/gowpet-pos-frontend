'use client'

import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import BarcodeScannerModal from './BarcodeScannerModal'

export default function BarcodeInput(props: InputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const ref = useRef<HTMLInputElement | null>(null)

  function propagateAsChangeEvent(code: string) {
    const el = ref.current
    if (!el) {
      // TODO remove this
      console.debug('el not found')
      return
    }

    el.value = code
    el.dispatchEvent(new Event('change'))
  }

  return (
    <InputGroup>
      <Input {...props} ref={ref} />
      <InputRightElement width="fit-content" padding={1}>
        <Button onClick={onOpen} size="sm">
          Use Scanner
        </Button>

        <BarcodeScannerModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={propagateAsChangeEvent}
        />
      </InputRightElement>
    </InputGroup>
  )
}
