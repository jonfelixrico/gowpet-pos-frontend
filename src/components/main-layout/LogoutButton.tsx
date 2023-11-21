'use client'

import { Button, useDisclosure } from '@chakra-ui/react'
import ConfirmDialog from '../common/ConfirmDialog'
import { startTransition } from 'react'

export default function LogoutButton({
  onLogOutConfirm,
}: {
  onLogOutConfirm: () => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function logOut() {
    // TODO use the form approach to support porgressive enhancement
    startTransition(() => {
      onLogOutConfirm()
    })
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
