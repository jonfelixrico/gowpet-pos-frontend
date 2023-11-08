import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { SearchState, useSearch } from './useSearch'
import BillingCatalogSearchItem from './BillingCatalogSearchItem'
import { CatalogItem } from '@/types/CatalogItem'

type BillingCatalogSearchDialogProps = {
  initialState: SearchState
  onAdd: (item: CatalogItem) => void
  cannotAdd: Set<string>
} & Pick<ModalProps, 'isOpen' | 'onClose'>

export default function BillingCreateSearchDialog({
  isOpen,
  onClose,
  initialState,
  onAdd,
  cannotAdd,
}: BillingCatalogSearchDialogProps) {
  const { items, canLoadMore, startSearch, loadMore } = useSearch(initialState)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            {items.map((item) => (
              <BillingCatalogSearchItem
                catalogItem={item}
                onAdd={() => onAdd(item)}
                key={item.id}
                canAdd={!cannotAdd.has(item.id)}
              />
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
