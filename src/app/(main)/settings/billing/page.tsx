import { Box } from '@chakra-ui/react'
import ReceiptSection from '@/components/settings/billing/ReceiptSection'

export default function BillingSettingsPage() {
  return (
    <Box height="full" data-page="billing-settings">
      <ReceiptSection />
    </Box>
  )
}
