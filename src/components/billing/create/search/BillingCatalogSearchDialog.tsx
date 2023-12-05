'use client '

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { SearchState } from './useSearch'
import { Dispatch, SetStateAction } from 'react'
import { Billing } from '@/types/Billing'
import BillingCatalogSearchDialogContent from './BillingCatalogSearchDialogContent'

type BillingCatalogSearchDialogProps = {
  initialState: SearchState
  billing: Billing
  setBilling: Dispatch<SetStateAction<Billing>>
} & Pick<ModalProps, 'isOpen' | 'onClose'>

export default function BillingCreateSearchDialog({
  isOpen,
  onClose,
  initialState,
  billing,
  setBilling,
}: BillingCatalogSearchDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent data-cy="add-items-dialog">
        <BillingCatalogSearchDialogContent
          billing={billing}
          setBilling={setBilling}
          initialState={initialState}
        />

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} data-cy="close">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
