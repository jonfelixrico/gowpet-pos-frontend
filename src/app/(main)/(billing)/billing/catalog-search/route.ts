import { apiFetchData } from '@/server-utils/resource-api-util'
import { CatalogItem } from '@/types/CatalogItem'
import { NextRequest, NextResponse } from 'next/server'

/*
 * We can just directly call /api/catalog in the client side.
 * The advantage doing this over directly calling has is that we don't
 * have to insert the Authorization header.
 */
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
