import { usePathname } from 'next/navigation'
import RouteLinkButton from '../common/RouteLinkButton'

export default function SettingsTabs() {
  const path = usePathname()
  return (
    <>
      <RouteLinkButton
        currentPath={path}
        href="/settings/billing"
        pattern={/\/billing$/}
      >
        Billing
      </RouteLinkButton>
    </>
  )
}
