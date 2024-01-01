'use client'

import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'

export default function CreateAccountDialogPage() {
  return (
    <>
      <ModalHeader>Create Account</ModalHeader>
      <ModalCloseButton />
      <ModalBody>Test</ModalBody>

      <ModalFooter>
        {/* TODO inject the close method here */}
        <Button variant="ghost" mr={3}>
          Cancel
        </Button>
        <Button colorScheme="blue">Create Account</Button>
      </ModalFooter>
    </>
  )
}
