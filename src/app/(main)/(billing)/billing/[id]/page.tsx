import { apiFetchData } from '@/server-utils/resource-api-util'
import { FetchError } from '@/utils/fetch-utils'
import {
  Card,
  CardBody,
  Divider,
  Flex,
  IconButton,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { notFound } from 'next/navigation'
import BillingDetailsItemsSection from './BillingDetailsItemsSection'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { SavedBilling } from '../../SavedBilling'

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

  const { items, notes } = data

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
          </Flex>

          <Divider />

          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">Notes</Text>
            <Textarea isReadOnly resize="none" value={notes} />
          </Flex>
        </CardBody>
      </Card>

      <Card>
        <CardBody as={Flex} gap={2} direction="column">
          <Text fontSize="lg" fontWeight="bold">
            Items
          </Text>
          <Divider />
          <BillingDetailsItemsSection items={items} />
        </CardBody>
      </Card>
    </Flex>
  )
}
