'use client'

import CreateUserFormContainer from '@/components/settings/user/create/CreateUserFormContainer'
import CreateUserFormFields from '@/components/settings/user/create/CreateUserFormFields'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Spacer,
} from '@chakra-ui/react'
import { Form } from 'formik'
import { createUser } from './actions'
import { Credentials } from '@/types/login-types'
import { useContext, useState } from 'react'
import { If, Then } from 'react-if'
import { useRouter } from 'next/navigation'
import CloseModalContext from './CloseModalContext'

export default function CreateUserDialog() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const closeModal = useContext(CloseModalContext)

  async function submit(credentials: Credentials) {
    try {
      await createUser(credentials)
      closeModal()
      router.replace('/settings/user')
    } catch (e) {
      setErrorMessage('An unexpected error occured. Please try again later.')
    }
  }

  return (
    <>
      <CreateUserFormContainer onSubmit={submit}>
        {(props) => (
          <Form>
            <ModalHeader>Create User</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={Flex} direction="column" gap={3}>
              <If condition={!!errorMessage}>
                <Then>
                  <Alert status="error">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                </Then>
              </If>

              <CreateUserFormFields />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={() => props.resetForm()}>
                Reset
              </Button>

              <Spacer />

              {/* TODO inject the close method here */}
              <Button variant="ghost" mr={3} onClick={closeModal}>
                Cancel
              </Button>

              <Button
                colorScheme="blue"
                type="submit"
                isLoading={props.isSubmitting}
              >
                Create
              </Button>
            </ModalFooter>
          </Form>
        )}
      </CreateUserFormContainer>
    </>
  )
}
