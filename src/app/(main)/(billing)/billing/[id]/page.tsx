import { apiFetchData } from '@/server-utils/resource-api-util'
import { Billing } from '@/types/Billing'
import { FetchError } from '@/utils/fetch-utils'
import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  IconButton,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { notFound } from 'next/navigation'
import BillingDetailsItemSection from './BillingDetailsItemSection'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

export default async function Billing({
  params,
}: {
  params: {
    id: string
  }
}) {
  let data: Billing
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
    <Flex direction="column" gap="2">
      <Card>
        <CardBody as={Flex} gap={2}>
          <Flex gap={2}>
            <Link href="/billing">
              <IconButton aria-label="go back to billings list">
                <IoIosArrowBack />
              </IconButton>
            </Link>

            <Text>Billing Information</Text>
          </Flex>

          <Divider />

          <Flex direction="column" gap={2}>
            <Text>Notes</Text>
            <Textarea isReadOnly value={notes} />
          </Flex>
        </CardBody>
      </Card>

      <Card>
        <CardBody as={Flex} gap={2}>
          <Text>Items</Text>
          <Divider />
          <BillingDetailsItemSection items={items} />
        </CardBody>
      </Card>
    </Flex>
  )
}
