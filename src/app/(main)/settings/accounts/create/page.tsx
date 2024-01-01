'use client'

import BaseCreateUserFormContainer from '@/components/user/create/BaseCreateUserFormContainer'
import BaseCreateUserFormFields from '@/components/user/create/BaseCreateUserFormFields'
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
      <BaseCreateUserFormContainer onSubmit={createUser}>
        {(props) => (
          <Form>
            <ModalHeader>Create Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={Flex} direction="column" gap={3}>
              <BaseCreateUserFormFields />
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
      </BaseCreateUserFormContainer>
    </>
  )
}
