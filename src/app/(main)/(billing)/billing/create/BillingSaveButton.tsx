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
  onSave: (billing: Billing) => void
  billing: Billing
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Save
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
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

              <form action={() => onSave(billing)}>
                <Button colorScheme="blue" type="submit" ml={3}>
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
