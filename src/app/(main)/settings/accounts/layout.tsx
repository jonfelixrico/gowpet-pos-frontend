import { ReactNode } from 'react'

export default function AccountSettingsLayout({
  children,
  list,
}: {
  children: ReactNode
  list: ReactNode
}) {
  return (
    <>
      {list}
      {children}
    </>
  )
}
