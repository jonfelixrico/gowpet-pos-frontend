import { ReactNode } from 'react'

export default function AccountSettingsLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <>
      {modal}
      {children}
    </>
  )
}
