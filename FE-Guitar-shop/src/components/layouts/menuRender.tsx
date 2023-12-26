import {
  AreaChartOutlined,
  FolderOpenOutlined,
  FundOutlined,
  GiftOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import { MenuProps } from 'antd'

export const userMenu: MenuProps['items'] = [
  {
    type: 'group',
    label: 'Quản lý',
    children: [
      {
        key: '/users',
        icon: <AreaChartOutlined />,
        label: 'Dashboard'
      },
      {
        key: '/users/category',
        icon: <FolderOpenOutlined />,
        label: 'Danh mục'
      },
      {
        key: '/users/product',
        icon: <GiftOutlined />,
        label: 'Sản phẩm'
      },
      {
        key: '/users/order',
        icon: <PhoneOutlined />,
        label: 'Đơn hàng'
      },
      {
        key: '/users/discount',
        icon: <FundOutlined />,
        label: 'Mã giảm giá'
      }
    ]
  }
]
