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
import { useRef, useState } from 'react'

export default function BillingSaveButton({
  onSave,
  billing,
}: {
  /**
   * Server action for saving the billing
   */
  onSave: (billing: Billing) => Promise<void>
  billing: Billing
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submitBilling() {
    setIsSubmitting(true)
    try {
      await onSave(billing)
    } finally {
      setIsSubmitting(false)
    }
  }

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

              {/* We're using action here instead of the button's onClick because onSave is a server action.
                  Server actions cannot be called via onClick */}
              <form action={submitBilling}>
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
