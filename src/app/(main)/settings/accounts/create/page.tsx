'use client'

import CreateUserFormContainer from '@/components/user/create/CreateUserFormContainer'
import CreateUserFormFields from '@/components/user/create/CreateUserFormFields'
import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import { Form } from 'formik'
import { createUser } from './actions'

export default function CreateAccountDialogPage() {
  return (
    <>
      <CreateUserFormContainer onSubmit={createUser}>
        {(props) => (
          <Form>
            <ModalHeader>Create Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={Flex} direction="column" gap={3}>
              <CreateUserFormFields />
            </ModalBody>

            <ModalFooter>
              {/* TODO inject the close method here */}
              <Button variant="ghost" mr={3}>
                Cancel
              </Button>

              <Button
                colorScheme="blue"
                type="submit"
                isLoading={props.isSubmitting}
              >
                Create Account
              </Button>
            </ModalFooter>
          </Form>
        )}
      </CreateUserFormContainer>
    </>
  )
}
