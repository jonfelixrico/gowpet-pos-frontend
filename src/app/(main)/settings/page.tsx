import { RedirectType, permanentRedirect } from 'next/navigation'

export default function SettingsDefaultPage() {
  permanentRedirect('/settings/billing', RedirectType.replace)
}
