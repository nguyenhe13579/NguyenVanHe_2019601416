import {
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
  UserResponse
} from '@/types/auth'
import { UpdatePayload, UserInfo } from '@/types/user'
import { client } from './client'

export const AuthService = {
  register(payload: RegisterPayload): Promise<UserResponse> {
    return client.post('/user/register', { ...payload })
  },
  login(payload: LoginPayload): Promise<UserInfo[]> {
    return client.post('/user/login', { ...payload })
  },
  changePassword(payload: ChangePasswordPayload) {
    return client.post('/user/change-password', { ...payload })
  },
  update(id: number, payload: UpdatePayload) {
    return client.post(`/user/update/${id}`, { ...payload })
  },
  newUser(): Promise<UserInfo> {
    return client.post('/new-user')
  }
}
