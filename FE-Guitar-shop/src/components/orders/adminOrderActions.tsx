import { useRouter } from 'next/router'

import {
  CheckCircleFilled,
  CloseCircleFilled,
  EyeOutlined,
  RocketOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Button, Popconfirm, Popover } from 'antd'
import { ProductService } from '@/services/product'
import { UpdatePayload } from '@/types/product'
import { OrderService } from '@/services/order'
import { Order } from '@/types/order'

type Props = {
  order: Order
}

const AdminOrderActions = (props: Props) => {
  const { order } = props
  const router = useRouter()

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

  const onChangeAmount = async () => {
    try {
      // Lấy chi tiết đơn hàng qua id
      const response = await OrderService.showDetail(order.id)
      // Cập nhật số hàng tồn
      if (response) {
        response.forEach(orderDetail => {
          fetchProductAmount(orderDetail.product_id, orderDetail.quantity)
        })
      }
    } catch {
      notificationError('Trừ hàng tồn thất bại')
    }
  }

  const onAction = async (status: number) => {
    try {
      if (await OrderService.updateStatus(order.id, { status: status }))
        notificationSuccess('Thao tác thành công')
      if(status === 0) {
        fetchOrderDetails()
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    }
  }

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

  const content = (
    <>
      <div>
        <Button
          type="text"
          style={{ color: '#1677FF' }}
          onClick={() => router.push(`/users/order/${order.id}`)}
        >
          <EyeOutlined /> Xem chi tiết
        </Button>
      </div>
      <div>
        <Button
          type="text"
          style={{ color: '#BF081D' }}
          onClick={() => onAction(2)}
          disabled={order.status !== 1}
        >
          <RocketOutlined /> Giao hàng
        </Button>
      </div>
      <div>
        <Button
          type="text"
          style={{ color: '#00B96B' }}
          onClick={() => {
            // onChangeAmount()
            onAction(3)
          }}
          disabled={order.status !== 2}
        >
          <CheckCircleFilled /> Hoàn thành
        </Button>
      </div>
      <div>
        <Popconfirm
          title="Cảnh báo"
          description="Bạn có chắc muốn hủy đơn hàng này?"
          onConfirm={() => onAction(0)}
          okText="Đồng ý"
          cancelText="Đóng"
          disabled={order.status === 3 || order.status === 0}
        >
          <Button
            disabled={order.status === 3 || order.status === 0}
            type="text"
            style={{ color: 'red' }}
          >
            <CloseCircleFilled /> Hủy đơn hàng
          </Button>
        </Popconfirm>
      </div>
    </>
  )

  return (
    <Popover placement="left" content={content} trigger="click">
      <Button>
        <SettingOutlined />
      </Button>
    </Popover>
  )
}

export default AdminOrderActions

