import { apiFetchData } from '@/server-utils/resource-api-util'
import { FetchError } from '@/utils/fetch-utils'
import {
  Card,
  CardBody,
  Divider,
  Flex,
  IconButton,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { notFound } from 'next/navigation'
import BillingDetailsItemsSection from './BillingDetailsItemsSection'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { SavedBilling } from '@/types/SavedBilling'
import BillingDetailsInfoSection from './BillingDetailsInfoSection'
import BillingPrintReceiptButton from './BillingPrintReceiptButton'
import { MdPrint } from 'react-icons/md'

export default async function Billing({
  params,
}: {
  params: {
    id: string
  }
}) {
  let data: SavedBilling
  try {
    const response = await apiFetchData(`/billing/${params.id}`)
    data = response.data
  } catch (e) {
    if (e instanceof FetchError && e.response.status === 404) {
      notFound()
    }

    throw e
  }

  return (
    <Flex direction="column" gap="2" width="full" height="full">
      <Card>
        <CardBody as={Flex} gap={2} direction="column">
          <Flex gap={2} align="center">
            <Link href="/billing">
              <IconButton
                aria-label="go back to billings list"
                variant="ghost"
                isRound
              >
                <IoIosArrowBack />
              </IconButton>
            </Link>

            <Text fontWeight="bold" fontSize="xl">
              Billing Information
            </Text>

            <Spacer />

            <BillingPrintReceiptButton
              colorScheme="blue"
              billing={data}
              leftIcon={<MdPrint />}
            />
          </Flex>

          <Divider />

          <BillingDetailsInfoSection billing={data} />
        </CardBody>
      </Card>

      <Card>
        <CardBody as={Flex} gap={2} direction="column">
          <Text fontSize="lg" fontWeight="bold">
            Items
          </Text>
          <Divider />
          <BillingDetailsItemsSection items={data.items} />
        </CardBody>
      </Card>
    </Flex>
  )
}
