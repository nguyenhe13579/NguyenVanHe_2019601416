import { Category, CategoryPayload, CategoryResponse } from './../types/category'
import { client } from './client'

export const CategoryService = {
  getList(): Promise<CategoryResponse> {
    return client.post('/category/list')
  },
  create(payload: CategoryPayload) {
    return client.post('/category/create', { ...payload })
  },
  delete(id: number) {
    return client.delete(`/category/${id}`)
  },
  show(id: string | string[] | undefined): Promise<Category> {
    return client.post(`/category/${id}`)
  },
  update(id: string | string[] | undefined, payload: CategoryPayload) {
    return client.post(`/category/update/${id}`, { ...payload })
  }
}
