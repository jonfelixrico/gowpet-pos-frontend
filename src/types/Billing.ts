export interface BillingItem {
  catalogId: string
  name: string
  price: number
  quantity: number
}

export interface Billing {
  items: BillingItem[]
  notes: string
}
