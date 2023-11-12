export interface BillingDetailsItemData {
  catalogItem: {
    id: string
    name: string
  }

  price: number
  quantity: number
}

export interface BillingDetailsData {
  id: string
  notes?: string
  items: BillingDetailsItemData[]
}
