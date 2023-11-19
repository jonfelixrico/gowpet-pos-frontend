'use client'

import { Button, useDisclosure } from '@chakra-ui/react'
import ConfirmDialog from '../common/ConfirmDialog'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { push } = useRouter()

  function logOut() {
    Cookies.remove('token')
    push('/login')
  }

  return (
    <>
      <ConfirmDialog
        isOpen={isOpen}
        onCancel={onClose}
        onDismiss={onClose}
        onOk={logOut}
        header="Log Out"
        ok={{
          colorScheme: 'red',
        }}
        cancel={{
          variant: 'ghost',
        }}
        data-cy="logout-confirmation"
      >
        Are you sure that you want to log out?
      </ConfirmDialog>

      <Button
        variant="ghost"
        colorScheme="red"
        onClick={onOpen}
        data-cy="logout"
      >
        Log out
      </Button>
    </>
  )
}
