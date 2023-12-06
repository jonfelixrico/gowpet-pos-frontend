import { Card, CardBody } from '@chakra-ui/react'
import { apiFetchData } from '@/server-utils/resource-api-util'
import { redirect } from 'next/navigation'
import DetailsLayoutWithTitle from '@/components/common/DetailsLayoutWithTitle'
import CatalogForm, {
  CatalogFormFields,
} from '@/components/catalog/CatalogForm'
import { revalidateTag } from 'next/cache'
import { CatalogTags } from '@/next/tags/catalog-tags'

export default function CatalogCreate() {
  async function create({ code, codeType, ...others }: CatalogFormFields) {
    'use server'

    const toSave = {
      ...others,
      code: code || null,
      codeType: code ? codeType : null,
    }

    await apiFetchData('/catalog/product', {
      method: 'POST',
      body: JSON.stringify(toSave),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    revalidateTag(CatalogTags.list())

    // TODO implement feature where you can toggle going back to the catalog
    redirect('/catalog')
  }

  return (
    <DetailsLayoutWithTitle href="/catalog" title="Create Item">
      <Card>
        <CardBody>
          <CatalogForm onSubmit={create} />
        </CardBody>
      </Card>
    </DetailsLayoutWithTitle>
  )
}
