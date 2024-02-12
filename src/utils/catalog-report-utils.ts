import {
  CatalogReportEntry,
  CatalogReportItemReference,
} from '@/types/catalog-report-typings'
import { keyBy } from 'lodash'

export interface HydratedEntry extends CatalogReportEntry {
  name: string
}

export function hydrateEntries(
  entries: CatalogReportEntry[],
  references: CatalogReportItemReference[]
): HydratedEntry[] {
  const indexedRefs = keyBy(references, (ref) => ref.id)

  return entries.map((entry) => {
    return {
      ...entry,
      name: indexedRefs[entry.catalogItemId]?.name,
    }
  })
}
