'use client'

import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { ChangeEventHandler, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function CatalogSearchInput({
  initialValue,
}: {
  initialValue: string
}) {
  const [value, setValue] = useState(initialValue || '')
  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  return (
    <InputGroup>
      <Input value={value} onChange={handleInput} />
      <InputRightElement padding={5}>
        {/* TODO replace with search button */}
        <IconButton isRound aria-label="Search" size="sm">
          <FaSearch />
        </IconButton>
      </InputRightElement>
    </InputGroup>
  )
}
