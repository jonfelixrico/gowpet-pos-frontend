import { apiFetchData } from '@/server-utils/resource-api-util'
import { CatalogItem } from '@/types/CatalogItem'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      code: string
    }
  }
) {
  const { data } = await apiFetchData<CatalogItem>(
    `/catalog/code/${params.code}`
  )

  return NextResponse.json(data)
}
