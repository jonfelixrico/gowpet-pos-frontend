import { RedirectType, permanentRedirect } from 'next/navigation'

export default function HomePage() {
  permanentRedirect('/billing', RedirectType.replace)
}
