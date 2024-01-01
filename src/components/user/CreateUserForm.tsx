'use client'

import { Credentials } from '@/types/login-types'
import { Button, Flex } from '@chakra-ui/react'
import { Form } from 'formik'

import BaseCreateUserFormFields from './BaseCreateUserFormFields'
import BaseCreateUserFormContainer from './BaseCreateUserFormContainer'

export default function CreateUserForm({
  onSubmit,
}: {
  onSubmit: (credentials: Credentials) => Promise<void>
}) {
  return (
    <BaseCreateUserFormContainer onSubmit={onSubmit}>
      {(props) => (
        <Form>
          <Flex direction="column" alignItems="stretch" gap="2">
            <BaseCreateUserFormFields />

            <Button
              isLoading={props.isSubmitting}
              type="submit"
              data-cy="submit"
              colorScheme="blue"
            >
              Create User
            </Button>
          </Flex>
        </Form>
      )}
    </BaseCreateUserFormContainer>
  )
}
