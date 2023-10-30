'use client'

import { Button } from '@chakra-ui/react'

export default function CatalogDetailsDeleteButton({
  onClick,
}: {
  onClick: () => Promise<void>
}) {
  return <Button onClick={onClick}>Delete</Button>
}
