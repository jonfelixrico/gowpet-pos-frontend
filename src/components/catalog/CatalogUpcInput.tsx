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
import { useRef } from 'react'
import CatalogUpcInputScanModal from './CatalogUpcInputScanModal'
import { BsUpcScan } from 'react-icons/bs'
import { Else, If, Then } from 'react-if'
import { makeInputEmitInputEvent } from '@/utils/react-utils'

export default function CatalogUpcInput(props: InputProps) {
  const { value } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  const ref = useRef<HTMLInputElement | null>(null)
  function setValue(code: string) {
    const el = ref.current
    if (!el) {
      return
    }

    makeInputEmitInputEvent(el, code)
  }

  function handleInputClick() {
    if (!value) {
      onOpen()
    }
  }

  return (
    <InputGroup>
      <Input
        {...props}
        value={value}
        ref={ref}
        placeholder="Click to scan"
        onClick={handleInputClick}
      />
      <InputRightElement padding={1} width="fit-content">
        <If condition={!!value}>
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

        <CatalogUpcInputScanModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={setValue}
        />
      </InputRightElement>
    </InputGroup>
  )
}
