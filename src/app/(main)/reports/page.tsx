import { RedirectType, redirect } from 'next/navigation'

export default function RootReportsPage() {
  redirect('/reports/catalog', RedirectType.replace)
}
