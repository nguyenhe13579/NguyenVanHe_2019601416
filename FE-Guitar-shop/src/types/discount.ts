export type Discount = {
  id: number
  code: string
  value: number
  status: number
  label?: string
  created_at: string
  updated_at: string
}

export type DiscountPayload = {
  code?: string
  value?: number
  label?: string
  status: number
}

export type DiscountsResponse = {
  total: number
  discounts: Discount[]
}
