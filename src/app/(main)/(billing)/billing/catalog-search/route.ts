import { apiFetchData } from '@/server-utils/resource-api-util'
import { CatalogItem } from '@/types/CatalogItem'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { data, headers } = await apiFetchData<CatalogItem[]>(
    `/catalog?${request.nextUrl.searchParams.toString()}`
  )

  return NextResponse.json(data, {
    headers: {
      'X-Total-Count': headers.get('X-Total-Count') ?? '0',
    },
  })
}
