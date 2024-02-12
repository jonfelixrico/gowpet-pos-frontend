import { apiFetchData } from '@/server-utils/resource-api-util'
import {
  CatalogReportEntry,
  CatalogReportItemReference,
} from '@/types/catalog-report-typings'
import { HydratedEntry, hydrateEntries } from '@/utils/catalog-report-utils'
import { NextRequest, NextResponse } from 'next/server'
import { json2csv } from 'json-2-csv'

export async function GET(request: NextRequest) {
  const { data } = await apiFetchData<{
    references: CatalogReportItemReference[]
    entries: CatalogReportEntry[]
  }>('/catalog/report')
  const hydrated = hydrateEntries(data.entries, data.references)

  const csv = json2csv(hydrated, {
    keys: ['name', 'price', 'quantity'] as Array<keyof HydratedEntry>,
  })

  const filename = request.nextUrl.searchParams.get('filename') ?? 'report.csv'
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'application/csv',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
