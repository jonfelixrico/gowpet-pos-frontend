import { ReactNode } from 'react'

export default function UserSettingsLayout({
  children,
  dialog,
}: {
  children: ReactNode
  dialog: ReactNode
}) {
  return (
    <>
      {dialog}
      {children}
    </>
  )
}
