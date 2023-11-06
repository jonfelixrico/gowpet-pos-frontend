'use client'

import { Icon, IconButton } from '@chakra-ui/react'
import { IoIosArrowBack } from 'react-icons/io'

/*
 * This is only here because we can't direclty use the code below
 * in a server component...
 */
export default function BackIconButton() {
  return (
    // i18nize the aria label
    <IconButton
      isRound
      icon={<Icon as={IoIosArrowBack} />}
      aria-label="Back to catalog list"
      variant="ghost"
    />
  )
}
