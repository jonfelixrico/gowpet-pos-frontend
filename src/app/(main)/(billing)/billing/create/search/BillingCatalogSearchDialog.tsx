'use client '

import {
  Button,
  Center,
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

function SearchBarContent({
  triggerSearch,
  isLoading,
}: {
  triggerSearch: (searchTerm: string) => void
  isLoading: boolean
}) {
  const [input, setInput] = useState('')

  return (
    <>
      <Input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        isReadOnly={isLoading}
      />
      <Button isLoading={isLoading} onClick={() => triggerSearch(input)}>
        Search
      </Button>
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
  const { items, canLoadMore, startSearch, loadMore, isLoading } =
    useSearch(initialState)

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent data-cy="add-items-dialog">
        <ModalHeader as={Flex} direction="column" gap={5}>
          <Text>Add Item</Text>
          <Flex gap={2} align="center" data-cy="search">
            <SearchBarContent
              triggerSearch={startSearch}
              isLoading={isLoading}
            />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            <If condition={items.length > 0}>
              {items.map((item) => (
                <BillingCatalogSearchItem
                  catalogItem={item}
                  onAdd={() => onAdd(item)}
                  key={item.id}
                  canAdd={!cannotAdd.has(item.id)}
                />
              ))}

              <If condition={canLoadMore}>
                <Button onClick={loadMore} isLoading={isLoading}>
                  Load More
                </Button>
              </If>
            </If>

            <If condition={items.length === 0}>
              <Center width="full">No items to show</Center>
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
