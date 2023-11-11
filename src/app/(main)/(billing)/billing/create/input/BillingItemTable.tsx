'use client'

import { Flex, Table, TableContainer, Tbody, Th, Thead } from '@chakra-ui/react'
import BillingItemTableRow from './BillingItemTableRow'
import { produce } from 'immer'
import { Billing } from '@/types/Billing'
import { useState } from 'react'
import ConfirmDialog from '@/components/common/ConfirmDialog'

export interface BillingItemTableProps {
  billing: Billing
  onChange: (value: Billing) => void
}

export default function BillingItemTable({
  billing,
  onChange,
}: BillingItemTableProps) {
  function onItemDelete(catalogId: string) {
    const updatedBilling = produce(billing, ({ items }) => {
      const idx = items.findIndex((item) => item.catalogId === catalogId)

      // -1 means findIndex didn't find a match
      if (idx === -1) {
        /*
         * We're throwing an error here because we're expecting an item of `catalogId` to always
         * be found. If it's not found, then its a data error and shouldn't really be happening
         * from the start.
         */
        throw new Error('Data error: item not found')
      }

      items.splice(idx, 1)
    })

    onChange(updatedBilling)
  }

  function onItemQuantityChange(catalogId: string, newQuantity: number) {
    const updatedBilling = produce(billing, ({ items }) => {
      const item = items.find((inArr) => inArr.catalogId === catalogId)
      if (!item) {
        /*
         * We're throwing an error here because we're expecting an item of `catalogId` to always
         * be found. If it's not found, then its a data error and shouldn't really be happening
         * from the start.
         */
        throw new Error('Data error: item not found')
      }

      item.quantity = newQuantity
    })

    onChange(updatedBilling)
  }

  const [idForDeletion, setIdForDeletion] = useState<string | null>(null)
  function handleConfirm(id: string) {
    setIdForDeletion(null)
    onItemDelete(id)
  }

  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Amount</Th>
            <Th />
          </Thead>

          <Tbody>
            {billing.items.map((item) => (
              <BillingItemTableRow
                key={item.catalogId}
                item={item}
                onDelete={() => setIdForDeletion(item.catalogId)}
                onQuantityChange={(val) =>
                  onItemQuantityChange(item.catalogId, val)
                }
                onEdit={() => {}}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        isOpen={!!idForDeletion}
        onOk={() => handleConfirm(idForDeletion as string)}
        onCancel={() => setIdForDeletion(null)}
        onDismiss={() => setIdForDeletion(null)}
        ok={{
          colorScheme: 'red',
          label: 'Yes, delete',
        }}
        message="Are you sure you want to remove this item?"
        title="Remove Item"
      />
    </>
  )
}
