import { UserInfo } from './user'

export type LoginPayload = {
  username: string
  password: string
}

export type RegisterPayload = {
  full_name: string
  username: string
  password: string
  email: string
  phone: number
  address: string
  birth: string
  gender: number
}

export type ChangePasswordPayload = {
  username: string
  old_password: string
  new_password: string
  password_confirm: string
}

export type UserResponse = {
  user: UserInfo
}

export type LoginResponse = {
  message: string
  result: UserInfo
}
