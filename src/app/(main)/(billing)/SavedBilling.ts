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
  notes?: string
  items: SavedBillingItem[]
}
