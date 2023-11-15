export interface SavedBillingItem {
  catalogItem: {
    id: string
    name: string
  }

  price: number
  quantity: number
}

export interface SavedBilling {
  id: string
  serialNo: number
  notes?: string
  items: SavedBillingItem[]
}
