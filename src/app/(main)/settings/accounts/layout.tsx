import { ReactNode } from 'react'

export default function AccountSettingsLayout(props: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  )
}
