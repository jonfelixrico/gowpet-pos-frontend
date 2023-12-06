import { CatalogItem } from '@/types/CatalogItem'
import { apiFetch, apiFetchData } from '@/server-utils/resource-api-util'
import { Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import CatalogDeleteButton from '@/components/catalog/details/CatalogDeleteButton'
import { FetchError } from '@/utils/fetch-utils'
import DetailsLayoutWithTitle from '@/components/common/DetailsLayoutWithTitle'
import CatalogDetailsCard from '@/components/catalog/details/CatalogDetailsCard'
import { CatalogTags } from '@/next/tags/catalog-tags'
import { revalidateTag } from 'next/cache'

interface Params {
  catalogId: string
}

export default async function CatalogDetails({ params }: { params: Params }) {
  const url = `/catalog/product/${params.catalogId}`

  let data: CatalogItem | null = null
  try {
    const response = await apiFetchData<CatalogItem>(url, {
      next: {
        tags: [CatalogTags.details(params.catalogId)],
      },
    })
    data = response.data
  } catch (e) {
    if (e instanceof FetchError && e.response.status === 404) {
      notFound()
    }

    throw e
  }

  async function submitDelete() {
    'use server'

    await apiFetch(url, {
      method: 'DELETE',
    })

    revalidateTag(CatalogTags.list())
    revalidateTag(CatalogTags.details(params.catalogId))

    redirect('/catalog')
  }

  return (
    <DetailsLayoutWithTitle
      href="/catalog"
      title="Item Details"
      actions={
        <Flex gap={2}>
          <Link href={`/catalog/${params.catalogId}/edit`}>
            <Button colorScheme="blue" data-cy="edit">
              Edit
            </Button>
          </Link>

          <CatalogDeleteButton onDelete={submitDelete} />
        </Flex>
      }
    >
      <CatalogDetailsCard catalogItem={data} />
    </DetailsLayoutWithTitle>
  )
}
