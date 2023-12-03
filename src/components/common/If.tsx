import { ReactNode } from 'react'

/**
 * @deprecated
 * Use `react-if` instead.
 */
export default function If({
  condition,
  children,
}: {
  condition?: boolean
  children?: ReactNode
}) {
  if (!condition) {
    return <></>
  }

  return children
}
