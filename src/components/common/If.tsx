import { ReactNode } from 'react'

export default function If({
  condition,
  children,
}: {
  condition?: boolean
  children: ReactNode
}) {
  if (!condition) {
    return <></>
  }

  return children
}
