import { Billing } from '@/types/Billing'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'

export default function BillingSaveButton({
  onSave,
  billing,
}: {
  /**
   * Server action for saving the billing
   */
  onSave: (billing: Billing) => void
  billing: Billing
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} data-cy="save">
        Save
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            data-cy="save-confirmation-dialog"
            data-dialog-open={isOpen}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Save Billing
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to save this billing? Once saved, it cannot
              be edited further.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>

              {/* We're using action here instead of the button's onClick because onSave is a server action.
                  Server actions cannot be called via onClick */}
              <form action={() => onSave(billing)}>
                <Button colorScheme="blue" type="submit" ml={3} data-cy="ok">
                  Yes, save
                </Button>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
