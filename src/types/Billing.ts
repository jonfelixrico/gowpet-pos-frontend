export interface Billing {
  items: {
    catalogId: string
    name: string
    price: number
    quantity: number
  }[]
  notes: string
}
