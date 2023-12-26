import { useRouter } from 'next/router'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { CloseCircleFilled, EyeOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space } from 'antd'
import { OrderService } from '@/services/order'
import { Order } from '@/types/order'
import { ProductService } from '@/services/product'
import { UpdatePayload } from '@/types/product'

type Props = {
  order: Order
}

const OrderActions = (props: Props) => {
  const { order } = props
  const router = useRouter()

  const fetchOrderDetails = async () => {
    try {
      const response = await OrderService.getOrderDetailByID({
        order_id: order.id.toString()
      })
      if(response) {
        response.forEach((product) => {
          fetchProductAmount(product.id, -product.quantity)
        })
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    }
  }
  const fetchProductAmount = async (id: number, quantity: number) => {
    try {
      const response = await ProductService.show(id)
      if (response) {
        updateProductAmount(
          id,
          response.amount - quantity,
          (response.sold || 0) + quantity
        )
      }
    } catch {
      notificationError('Không tìm thấy sản phẩm')
    }
  }
  const updateProductAmount = async (
    productID: number,
    amount: number,
    sold: number
  ) => {
    try {
      const payload: UpdatePayload = {
        amount: amount,
        sold: sold
      }
      await ProductService.update(productID, payload)
    } catch {
      notificationError('Cập nhật số lượng thất bại')
    }
  }

  const onTerminate = async () => {
    try {
      if (order.status === 1) {
        if (await OrderService.updateStatus(order.id, { status: 0 })){
          fetchOrderDetails()
          notificationSuccess('Hủy đơn hàng thành công')
        }
      } else {
        notificationError('Chỉ hủy đơn hàng khi đang xử lý')
      }
    } catch {
      notificationError('Hủy đơn thất bại')
    }
  }

  return (
    <div>
      <Space>
        <Button
          type="text"
          size="small"
          style={{ color: '#1677FF' }}
          title="Xem chi tiết"
          onClick={() => router.push(`/customers/orders/${order.id}`)}
        >
          <EyeOutlined />
        </Button>
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc muốn hủy đơn hàng này?"
          onConfirm={onTerminate}
          okText="Đồng ý"
          cancelText="Đóng"
          placement="left"
          disabled={order.status !== 1}
        >
          <Button
            type="text"
            title="Hủy đơn"
            size="small"
            disabled={order.status !== 1}
            style={{ color: 'red' }}
          >
            <CloseCircleFilled />
          </Button>
        </Popconfirm>
      </Space>
    </div>
  )
}

export default OrderActions
