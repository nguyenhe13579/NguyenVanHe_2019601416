import { Button, Image, Popover, Tag } from 'antd'
import { categoryStatus, orderStatus } from '@/configs/status'
import { Order, OrderDetailResponse } from '@/types/order'
import { ColumnsType } from 'antd/es/table'
import { formatPrice } from '@/helpers/currency'
import { Discount } from '@/types/discount'
import { Product } from '@/types/product'

import { getDetail } from '../products/getDetail'
import AdminOrderActions from '../orders/adminOrderActions'
import ProductActions from '../products/actions/productActions'
import DiscountAction from '../discount/discountAction'
import OrderActions from '../orders/orderActions'

export const productColumns: ColumnsType<Product> = [
  {
    title: 'ID',
    render: (_, data) => data.id
  },
  {
    title: 'Tên sản phẩm',
    render: (_, data) => (
      <Popover content={getDetail(data)} trigger="hover">
        <Button type="text" style={{ fontWeight: 'bold' }}>
          {data.name}
        </Button>
      </Popover>
    )
  },
  {
    title: 'Ảnh',
    render: (_, data) => <Image alt="product" width={100} src={data.image} />
  },
  {
    title: 'Giá',
    render: (_, data) => (
      <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
        {formatPrice(data.price)}
      </div>
    )
  },
  {
    title: 'Số lượng',
    render: (_, data) => data.amount
  },
  {
    title: 'Trạng thái',
    render: (_, data) => {
      const tag = categoryStatus.find(tag => tag.value === data.status)
      return <Tag color={tag?.color}>{tag?.label}</Tag>
    }
  },
  {
    title: 'Thao tác',
    render: (_, data) => <ProductActions id={data.id} />
  }
]

export const orderColumns: ColumnsType<Order> = [
  {
    title: 'ID',
    render: (_, data) => data.id
  },
  {
    title: 'Họ tên',
    render: (_, data) => data.full_name
  },
  {
    title: 'Địa chỉ',
    render: (_, data) => data.address
  },
  {
    title: 'Điện thoại',
    render: (_, data) => '0' + data.phone
  },
  {
    title: 'Email',
    render: (_, data) => data.email
  },
  {
    title: 'Ghi chú',
    render: (_, data) => data.note
  },
  {
    title: 'Tổng tiền',
    render: (_, data) => data.total_price
  },
  {
    title: 'Số lượng',
    render: (_, data) => data.quantity
  },
  {
    title: 'Trạng thái',
    render: (_, data) => {
      const tag = orderStatus.find(tag => tag.value === data.status)
      return <Tag color={tag?.color}>{tag?.label}</Tag>
    }
  },
  {
    title: 'Ngày tạo',
    render: (_, data) => new Date(data.created_at).toLocaleString()
  },
  {
    title: 'Ngày cập nhật',
    render: (_, data) => new Date(data.updated_at).toLocaleString()
  },
  {
    title: 'Thao tác',
    render: (_, data) => <OrderActions order={data} />
  }
]

export const orderDetailColumns: ColumnsType<OrderDetailResponse> = [
  {
    title: 'ID',
    render: (_, data) => data.id
  },
  {
    title: 'Tên sản phẩm',
    render: (_, data) => (
      <Popover content={getDetail(data)} trigger="hover">
        <Button type="text" style={{ fontWeight: 'bold' }}>
          {data.name}
        </Button>
      </Popover>
    )
  },
  {
    title: 'Ảnh',
    render: (_, data) => <Image alt="product" width={100} src={data.image} />
  },
  {
    title: 'Giá',
    render: (_, data) => (
      <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
        {formatPrice(data.price)}
      </div>
    )
  },
  {
    title: 'Số lượng',
    render: (_, data) => data.quantity
  },
  {
    title: 'Thành tiền',
    render: (_, data) => (
      <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
        {formatPrice(data.price * data.quantity)}
      </div>
    )
  }
]

export const adminOrderColumns: ColumnsType<Order> = [
  {
    title: 'ID',
    render: (_, data) => data.id
  },
  {
    title: 'Họ tên',
    render: (_, data) => data.full_name
  },
  {
    title: 'Địa chỉ',
    render: (_, data) => data.address
  },
  {
    title: 'Điện thoại',
    render: (_, data) => '0' + data.phone
  },
  {
    title: 'Email',
    render: (_, data) => data.email
  },
  {
    title: 'Tổng tiền',
    render: (_, data) => data.total_price
  },
  {
    title: 'Số lượng',
    render: (_, data) => data.quantity
  },
  {
    title: 'Trạng thái',
    render: (_, data) => {
      const tag = orderStatus.find(tag => tag.value === data.status)
      return <Tag color={tag?.color}>{tag?.label}</Tag>
    }
  },
  {
    title: 'Ngày tạo',
    render: (_, data) => new Date(data.created_at).toLocaleString()
  },
  {
    title: 'Ngày cập nhật',
    render: (_, data) => new Date(data.updated_at).toLocaleString()
  },
  {
    title: 'Thao tác',
    render: (_, data) => <AdminOrderActions order={data} />
  }
]

export const discountColumns: ColumnsType<Discount> = [
  {
    title: 'ID',
    render: (_, data) => data.id
  },
  {
    title: 'Mã giảm giá',
    render: (_, data) => data.code
  },
  {
    title: 'Giá trị',
    render: (_, data) => data.value
  },
  {
    title: 'Nhãn',
    render: (_, data) => data.label
  },
  {
    title: 'Trạng thái',
    render: (_, data) => {
      const tag = categoryStatus.find(tag => tag.value === data.status)
      return <Tag color={tag?.color}>{tag?.label}</Tag>
    }
  },
  {
    title: 'Ngày tạo',
    render: (_, data) => <div>{new Date(data.created_at).toLocaleString()}</div>
  },
  {
    title: 'Ngày cập nhật',
    render: (_, data) => <div>{new Date(data.updated_at).toLocaleString()}</div>
  },
  {
    title: 'Thao tác',
    render: (_, data) => (
      <div>
        <DiscountAction discount={data} />
      </div>
    )
  }
]
