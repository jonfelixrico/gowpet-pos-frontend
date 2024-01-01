import { ReactNode } from 'react'

export default function AccountSettingsLayout({
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
