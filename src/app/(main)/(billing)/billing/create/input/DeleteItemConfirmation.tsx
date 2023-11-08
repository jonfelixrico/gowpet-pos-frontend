/* eslint-disable react/no-unescaped-entities */
import ConfirmDialog from '@/components/common/ConfirmDialog'

export default function DeleteItemConfirmation({
  onConfirm,
  idForDeletion,
  onClose,
}: {
  onConfirm: (id: string) => void
  onClose: () => void
  idForDeletion: string | null
}) {
  return (
    <ConfirmDialog
      isOpen={!!idForDeletion}
      onOk={() => onConfirm(idForDeletion as string)}
      onCancel={onClose}
      onDismiss={onClose}
      okColorScheme="red"
      okLabel="Yes, delete"
      message="Are you sure you want to remove this item?"
      title="Remove Item"
    />
  )
}
