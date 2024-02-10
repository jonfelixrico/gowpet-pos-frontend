export interface CatalogReportEntry {
  catalogItemId: string
  price: number
  quantity: number
}

export interface CatalogReportItemReference {
  id: string
  name: string
}

export interface CatalogReportDto {
  references: CatalogReportItemReference[]
  entries: CatalogReportEntry[]
}
