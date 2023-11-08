'use client '

import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react'
import { SearchState, useSearch } from './useSearch'
import BillingCatalogSearchItem from './BillingCatalogSearchItem'
import { CatalogItem } from '@/types/CatalogItem'
import { useState } from 'react'
import If from '@/components/common/If'

function SearchBar({
  triggerSearch,
}: {
  triggerSearch: (searchTerm: string) => void
}) {
  const [input, setInput] = useState('')

  return (
    <>
      <Input value={input} onChange={(event) => setInput(event.target.value)} />
      <Button onClick={() => triggerSearch(input)}>Search</Button>
    </>
  )
}

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
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Add Item</Text>
          <SearchBar triggerSearch={startSearch} />
        </ModalHeader>
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

            <If condition={canLoadMore}>
              <Button onClick={loadMore}>Load More</Button>
            </If>
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
