'use client'

import { Button, ModalBody, ModalFooter } from '@chakra-ui/react'

export default function CreateAccountDialogError({
  reset,
}: {
  reset: () => void
}) {
  return (
    <>
      <ModalBody>Error</ModalBody>
      <ModalFooter>
        {/* TODO inject the close button here */}
        <Button variant="ghost" mr={3}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={reset}>
          Try Again
        </Button>
      </ModalFooter>
    </>
  )
}
