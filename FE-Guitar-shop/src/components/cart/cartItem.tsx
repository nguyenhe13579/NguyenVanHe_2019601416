import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Col, Image, InputNumber, Popconfirm, Row } from 'antd'
import { notificationSuccess } from '@/helpers/notification'
import { DeleteOutlined } from '@ant-design/icons'
import { formatPrice } from '@/helpers/currency'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

type Props = {
  product: Cart
  keyItem: number
  products: Cart[]
  onDelete: (id: number) => void
  onChangeTotal: (id: number, quantity: number) => void
}

const CartItem = (props: Props) => {
  const router = useRouter()
  const { product, keyItem, products, onDelete, onChangeTotal } = props
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', [])
  const [totalPrice, setTotalPrice] = useState<number>(product.price)

  const updateQuantity = async (value: number | null) => {
    const tempProducts = products.map(obj => {
      if (product.id === obj.id)
        return { ...obj, quantity: value, total: (value || 1) * obj.price }
      return obj
    })
    setCart(tempProducts)
  }

  const onDeleteCart = (cartProduct: Cart) => {
    onDelete(cartProduct.id)
    setCart(cart.filter(product => product.id !== cartProduct.id))
    notificationSuccess('Xóa sản phẩm thành công!')
  }

  useEffect(() => {
    cart.map(item => {
      if (item.id === product.id) setTotalPrice(item.total)
    })
  }, [])

  return (
    <Row
      style={{
        marginTop: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Col span={1} style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {keyItem}
      </Col>
      <Col span={7} style={{ textAlign: 'center', cursor: 'pointer' }}>
        <Image alt="product" width={100} src={product.image} />
        <div>
          <Button
            type="link"
            title="Xem chi tiết sản phẩm"
            style={{ fontWeight: 'bold' }}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            {product.name}
          </Button>
        </div>
      </Col>
      <Col span={5}>
        <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
          {formatPrice(product.price)}
        </div>
      </Col>
      <Col span={4}>
        <InputNumber
          defaultValue={product.quantity || 1}
          min={1}
          max={product.amount}
          onChange={value => {
            updateQuantity(value)
            onChangeTotal(product.id, value || 1)
            setTotalPrice((value || 1) * product.price)
          }}
        />
      </Col>
      <Col span={5}>
        <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
          {formatPrice(totalPrice)}
        </div>
      </Col>
      <Col span={2}>
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={() => onDeleteCart(product)}
          okText="Đồng ý"
          cancelText="Đóng"
        >
          <Button style={{ color: '#BF081D' }} type="text" block>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Col>
    </Row>
  )
}

export default CartItem
