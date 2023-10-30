import { Button } from '@chakra-ui/react'

export default function CatalogDeleteButton(props: {
  onDeleteConfirm: () => Promise<void>
}) {
  async function promptDelete() {
    await props.onDeleteConfirm()
  }

  return (
    <form action={promptDelete}>
      <Button type="submit">Delete</Button>
    </form>
  )
}
