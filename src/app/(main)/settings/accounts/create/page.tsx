import { Button, ModalBody, ModalFooter } from '@chakra-ui/react'

export default function CreateAccountDialogPage() {
  async function throwError() {
    'use server'

    throw new Error('test')
  }

  return (
    <>
      <ModalBody>Test</ModalBody>

      <ModalFooter>
        {/* TODO inject the close method here */}
        <form action={throwError}>
          <Button variant="ghost" mr={3}>
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit">
            Create Account
          </Button>
        </form>
      </ModalFooter>
    </>
  )
}
