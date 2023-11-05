'use client'

import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ChangeEventHandler, useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function CatalogSearchInput({
  initialValue,
}: {
  initialValue?: string | null
}) {
  const [value, setValue] = useState(initialValue || '')
  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  const href = useMemo(() => {
    const queryParams = new URLSearchParams()
    queryParams.set('searchTerm', value)

    return `/catalog?${queryParams.toString()}`
  }, [value])

  return (
    <InputGroup>
      <Input value={value} onChange={handleInput} />
      <InputRightElement padding={5}>
        <Link href={href} prefetch={false}>
          <IconButton isRound aria-label="Search" size="sm">
            <FaSearch />
          </IconButton>
        </Link>
      </InputRightElement>
    </InputGroup>
  )
}
