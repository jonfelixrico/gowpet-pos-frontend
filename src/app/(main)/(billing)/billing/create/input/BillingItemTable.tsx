'use client'

import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import BillingItemTableRow from './BillingItemTableRow'
import { produce } from 'immer'
import { Billing, BillingItem } from '@/types/Billing'
import { useState } from 'react'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import BillingItemEditDialog from './BillingItemEditDialog'

export interface BillingItemTableProps {
  billing: Billing
  setBilling: (value: Billing) => void
}

export default function BillingItemTable({
  billing,
  setBilling,
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

    setBilling(updatedBilling)
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

    setBilling(updatedBilling)
  }

  const [itemToEdit, setItemToEdit] = useState<BillingItem | null>(null)
  function saveChanges(toSave: BillingItem) {
    const updated = produce(billing, (toUpdate) => {
      const idx = toUpdate.items.findIndex(
        (item) => item.catalogId === toSave.catalogId
      )

      toUpdate.items[idx] = toSave
    })

    setBilling(updated)
    setItemToEdit(null)
  }

  const [idForDeletion, setIdForDeletion] = useState<string | null>(null)
  function handleConfirm(id: string) {
    setIdForDeletion(null)
    onItemDelete(id)
  }

  return (
    <>
      <TableContainer>
        <Table data-cy="items-table">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Amount</Th>
              <Th />
            </Tr>
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
                onEdit={() => {
                  setItemToEdit(item)
                }}
                data-cy="billing-item"
                data-billing-item-id={item.catalogId}
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
          content: 'Yes, delete',
        }}
        header="Remove Item"
        data-cy="delete-confirm"
      >
        Are you sure you want to remove this item?
      </ConfirmDialog>

      <BillingItemEditDialog
        key={itemToEdit?.catalogId ?? 'edit dialog'}
        isOpen={!!itemToEdit}
        onDismiss={() => setItemToEdit(null)}
        onOk={saveChanges}
        item={itemToEdit as BillingItem}
        data-cy="edit-dialog"
      />
    </>
  )
}
