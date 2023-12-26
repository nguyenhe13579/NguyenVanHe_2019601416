import {
  FilterPayload,
  Order,
  OrderDetailPayload,
  OrderDetailResponse,
  OrderID,
  OrderPayload,
  OrderResponse,
  OrderUpdate,
  UserID
} from '@/types/order'
import { OrderDetail } from './../types/order'
import { client } from './client'

export const OrderService = {
  createOrder(payload: OrderPayload) {
    return client.post('/order/create', { ...payload })
  },
  createOrderDetail(payload: OrderDetailPayload) {
    return client.post('/order/detail/create', { ...payload })
  },
  getLatestOrder(): Promise<Order> {
    return client.post('/latest')
  },
  getOrderByUser(payload: UserID): Promise<Order[]> {
    return client.post('/get-order', { ...payload })
  },
  getOrderDetailByID(payload: OrderID): Promise<OrderDetailResponse[]> {
    return client.post('/order-detail', { ...payload })
  },
  updateStatus(orderID: number, payload: OrderUpdate) {
    return client.post(`/order/update/${orderID}`, { ...payload })
  },
  getList(payload: FilterPayload): Promise<OrderResponse> {
    return client.post('order', { ...payload })
  },
  showDetail(id: number): Promise<OrderDetail[]> {
    return client.post(`order/${id}`)
  }
}
