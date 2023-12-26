export type UserInfo = {
  id: number
  username: string
  password: string
  full_name: string
  phone?: number
  email: string
  address?: string
  role: number
  gender: number
  birth?: string
  created_at: string
  updated_at: string
}

export type User = {
  isLoggedIn: boolean
  info?: UserInfo
}

export type UpdatePayload = {
  full_name: string
  email: string
  phone?: number
  address?: string
  gender: number
  birth?: string
}
