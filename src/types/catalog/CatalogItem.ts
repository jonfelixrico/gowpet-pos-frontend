export interface BaseCatalogItem {
  name: string
  price: number
  type: 'SERVICE' | 'PRODUCT'
  code?: string
  codeType?: 'UPC' | 'CUSTOM'
}

export type CatalogItem = {
  id: string
} & BaseCatalogItem
