'use client '

import {
  Button,
  Center,
  Flex,
  Input,
  ModalBody,
  ModalHeader,
  Text,
} from '@chakra-ui/react'
import { SearchState, useSearch } from './useSearch'
import { Dispatch, useState } from 'react'
import If from '@/components/common/If'
import { Billing } from '@/types/Billing'
import BillingCatalogSearchItemsList from './BillingCatalogSearchItemsList'

function SearchBarControls({
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
      <Button
        isLoading={isLoading}
        onClick={() => triggerSearch(input)}
        variant="outline"
      >
        Search
      </Button>
    </>
  )
}

export type BillingCatalogSearchDialogContentProps = {
  initialState?: SearchState
  billing?: Billing
  setBilling?: Dispatch<Billing>
}

export default function BillingCatalogSearchDialogContent({
  initialState,
  billing,
  setBilling,
}: BillingCatalogSearchDialogContentProps) {
  const { items, canLoadMore, startSearch, loadMore, isLoading } =
    useSearch(initialState)

  const hasItems = items.length > 0

  return (
    <>
      <ModalHeader as={Flex} direction="column" gap={5}>
        <Text>Search Item</Text>
        <Flex gap={2} align="center" data-cy="search">
          <SearchBarControls
            triggerSearch={startSearch}
            isLoading={isLoading}
          />
        </Flex>
      </ModalHeader>

      <ModalBody>
        <Flex direction="column" gap={3}>
          <If condition={hasItems}>
            <BillingCatalogSearchItemsList
              billing={billing}
              setBilling={setBilling}
              itemsToSelectFrom={items}
            />

            <If condition={canLoadMore}>
              <Button
                onClick={loadMore}
                isLoading={isLoading}
                data-cy="show-more"
                variant="outline"
              >
                Load More
              </Button>
            </If>
          </If>

          <If condition={!hasItems}>
            <Center width="full" height="25dvh" data-cy="no-items">
              No items to show
            </Center>
          </If>
        </Flex>
      </ModalBody>
    </>
  )
}
