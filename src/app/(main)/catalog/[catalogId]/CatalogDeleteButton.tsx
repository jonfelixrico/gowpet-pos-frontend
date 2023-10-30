import { Button } from '@chakra-ui/react'

export default function CatalogDeleteButton(props: {
  onDelete: () => Promise<void>
}) {
  async function promptDelete() {
    await props.onDelete()
  }

  return (
    <form action={promptDelete}>
      <Button type="submit">Delete</Button>
    </form>
  )
}
