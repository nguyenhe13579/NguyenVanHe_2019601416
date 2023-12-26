export type Product = {
  id: number
  category_id: number
  name: string
  image: string
  price: number
  amount: number
  description: string
  bonus?: string
  origin?: string
  style?: string
  material?: string
  paint?: string
  string_name?: string
  sold?: number
  brand?: string
  status: number
  rating_count?: number
  rating_score?: string
  created_at: string
  updated_at: string
}

export type ProductResponse = {
  total: number
  products?: Product[]
  page: number
  pageSize: number
}

export type ListPayload = {
  id?: number
  page?: number
  pageSize?: number
  categoryID?: number
  name?: string
  status?: number
  sortField?: string
  sortOrder?: string
  brand?: string
  price?: number
  fromPrice?: number
  toPrice?: number
}

export type CreatePayload = {
  category_id: number
  name: string
  image: string
  price: number | null
  amount: number | null
  status: number
  description?: string
  bonus?: string
  origin?: string
  style?: string
  material?: string
  paint?: string
  string_name?: string
  brand?: string
}

export type UpdatePayload = {
  category_id?: number
  name?: string
  image?: string
  price?: number | null
  amount?: number | null
  status?: number
  description?: string
  bonus?: string
  origin?: string
  style?: string
  material?: string
  paint?: string
  string_name?: string
  brand?: string
  sold?: number
}
