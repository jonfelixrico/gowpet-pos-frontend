import { CatalogItem } from './CatalogItem'

export interface BillingItem {
  quantity: number
  catalogItem: CatalogItem
}

export interface Billing {
  items: BillingItem[]
  notes: string
}
