import { Card, CardBody, Flex, Heading } from '@chakra-ui/react'
import CatalogCreateForm from './CatalogCreateForm'
import Link from 'next/link'
import BackIconButton from '../BackIconButton'
import { CatalogFormFields } from '@/components/catalog/CatalogForm'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { redirect } from 'next/navigation'

export default function CatalogCreate() {
  async function create(values: CatalogFormFields) {
    'use server'

    await apiFetchData('/catalog/product', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // TODO implement feature where you can toggle going back to the catalog
    redirect('/catalog')
  }

  return (
    <Flex height="full" width="full" direction="column" gap="5">
      <Flex gap="5" align="center">
        <Link href="/catalog" data-cy="back">
          <BackIconButton />
        </Link>
        <Heading>Create Item</Heading>
      </Flex>
      <Card>
        <CardBody>
          <CatalogCreateForm onSubmit={create} />
        </CardBody>
      </Card>
    </Flex>
  )
}
