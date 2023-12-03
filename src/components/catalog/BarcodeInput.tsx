'use client'

import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import BarcodeScannerModal from './BarcodeScannerModal'
import { BsUpcScan } from 'react-icons/bs'
import { Else, If, Then } from 'react-if'

export default function BarcodeInput({
  value: inputValue,
  ...props
}: InputProps) {
  const [innerValue, setInnerValue] = useState(String(inputValue ?? ''))
  useEffect(() => {
    setInnerValue(String(inputValue ?? ''))
  }, [inputValue])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const ref = useRef<HTMLInputElement | null>(null)
  function setValue(code: string) {
    const el = ref.current
    if (!el) {
      return
    }

    el.value = code
    el.dispatchEvent(new Event('change'))
    setInnerValue(code)
  }

  function handleInputClick() {
    if (!innerValue) {
      onOpen()
    }
  }

  return (
    <InputGroup>
      <Input
        {...props}
        value={innerValue}
        ref={ref}
        isReadOnly
        placeholder="Click to scan"
        onClick={handleInputClick}
      />
      <InputRightElement padding={1} width="fit-content">
        <If condition={!!innerValue}>
          <Then>
            <Button size="sm" onClick={() => setValue('')}>
              Clear
            </Button>
          </Then>

          <Else>
            <IconButton onClick={onOpen} size="sm" aria-label="Scan barcode">
              <BsUpcScan />
            </IconButton>
          </Else>
        </If>

        <BarcodeScannerModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={setValue}
        />
      </InputRightElement>
    </InputGroup>
  )
}
