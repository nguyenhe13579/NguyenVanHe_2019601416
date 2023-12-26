export type OrderDetail = {
  id: number
  order_id: number
  product_id: number
  quantity: number
}

export type ShowOrderDetail = {
  message: string
  result: OrderDetail[]
}

export type Order = {
  id: number
  user_id: number | null
  full_name: string
  address: string
  phone: number
  email: string
  note?: string
  quantity: number
  total_price: number
  status: number
  created_at: string
  updated_at: string
}

export type OrderDetailItem = {
  order_id: number
  product_id: number
  quantity: number
}

export type OrderDetailPayload = {
  products: OrderDetailItem[]
}

export type OrderPayload = {
  user_id: number
  full_name: string
  address: string
  phone: number
  email: string
  note?: string
  quantity: number
  total_price: number
  status: number
}

export type OrderDetailResponse = {
  id: number
  order_id: number
  product_id: number
  quantity: number
  created_at: string
  updated_at: string
  category_id: number
  name: string
  image: string
  price: number
  amount: number
  description: null | string
  bonus: string
  origin: string
  style: string
  material: string
  paint: string
  string_name: string
  sold: null
  status: number
  brand?: string
  rating_count?: number
  rating_score?: string
}

export type UserID = {
  user_id: number
}

export type OrderID = {
  order_id: string | string[] | undefined
}

export type OrderUpdate = {
  status: number
}

export type FilterPayload = {
  email?: string
  sortField?: string
  sortOrder?: string
  page?: number
  pageSize?: number
  status?: number
}

export type OrderResponse = {
  total: number
  orders?: Order[]
  page: number
  pageSize: number
}
