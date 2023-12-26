import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Popover } from 'antd'
import { notificationSuccess } from '@/helpers/notification'
import { Product } from '@/types/product'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

type Props = {
  product: Product
  onChange: (id: number) => void
}

const CartAction = (props: Props) => {
  const { product, onChange } = props
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', [])

  const onDelete = (cartProduct: Product) => {
    setCart(cart.filter(product => product.id !== cartProduct.id))
    notificationSuccess('Xóa sản phẩm thành công!')
  }

  const popContent = (
    <div style={{ flexDirection: 'column' }}>
      <Button
        style={{ display: 'flex', alignItems: 'center' }}
        type="text"
        block
      >
        <p style={{ margin: '5px' }}>Chi tiết Cloud Server</p>
      </Button>
      <Popconfirm
        title="Thông báo"
        description="Bạn có chắc muốn xóa sản phẩm này?"
        onConfirm={() => {
          onDelete(product)
          onChange(product.id)
        }}
        okText="Đồng ý"
        cancelText="Đóng"
      >
        <Button
          style={{ display: 'flex', alignItems: 'center', color: '#BF081D' }}
          type="text"
          block
        >
          <DeleteOutlined />
          <p style={{ margin: '5px' }}>Xóa sản phẩm</p>
        </Button>
      </Popconfirm>
    </div>
  )

  return (
    <Popover placement="left" content={popContent} trigger="click">
      <Button>
        <SettingOutlined />
      </Button>
    </Popover>
  )
}

export default CartAction
