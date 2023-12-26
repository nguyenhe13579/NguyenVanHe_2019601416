import { useEffect, useState } from 'react'

import { Button, Col, Empty, Input, Row } from 'antd'
import { Discount, DiscountPayload } from '@/types/discount'
import { notificationError } from '@/helpers/notification'
import { DiscountService } from '@/services/discount'
import { formatPrice } from '@/helpers/currency'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

import CartItem from './cartItem'

type Props = {
  discount: Discount | undefined
  onChangeProducts: (products: Cart[]) => void
  onDiscount: (discount: Discount) => void
}

const Cart = (props: Props) => {
  const { discount, onChangeProducts, onDiscount } = props
  const [products, setProducts] = useState<Cart[]>([])
  const [discountCode, setDiscountCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const cart = useLocalStorage<Cart[]>('cart', [])

  const getTotalPrice = () => {
    let total = 0
    products.map(product => (total += product.total))
    return total
  }

  const onDelete = (productID: number) => {
    const tempProducts = products.filter(product => product.id !== productID)
    setProducts(tempProducts)
    onChangeProducts(tempProducts)
  }

  const onChangeTotal = (id: number, quantity: number) => {
    const tempProducts = products.map(obj => {
      if (obj.id === id)
        return { ...obj, quantity: quantity, total: quantity * obj.price }
      return obj
    })
    setProducts(tempProducts)
    onChangeProducts(tempProducts)
  }

  const getDiscount = async () => {
    try {
      setLoading(true)
      if (discountCode === '') notificationError('Bạn chưa điền mã giảm giá')
      else {
        const payload: DiscountPayload = {
          status: 1,
          code: discountCode
        }
        const response = await DiscountService.get(payload)
        if (response.length === 0) notificationError('Mã giảm giá không đúng')
        else onDiscount(response[0])
      }
    } catch {
      notificationError('Mã giảm giá không đúng')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setProducts(cart[0])
  }, [])

  return (
    <div>
      <Row
        style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#888888' }}
      >
        <Col span={1} style={{ textAlign: 'center' }}>
          STT
        </Col>
        <Col span={7} style={{ textAlign: 'center' }}>
          Sản phẩm
        </Col>
        <Col span={5}>Giá</Col>
        <Col span={4}>Số lượng</Col>
        <Col span={5}>Thành tiền</Col>
        <Col span={2} style={{ textAlign: 'center' }}>
          Thao tác
        </Col>
      </Row>
      {products.length > 0 ? (
        products.map((product, key) => (
          <div key={key}>
            <CartItem
              keyItem={key + 1}
              product={product}
              products={products}
              onDelete={id => onDelete(id)}
              onChangeTotal={onChangeTotal}
            />
          </div>
        ))
      ) : (
        <Empty description="Không có sản phẩm nào" />
      )}
      <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Col span={6} offset={12}>
          <Input
            placeholder="Nhập mã giảm giá"
            onChange={e => setDiscountCode(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Button
            style={{ background: '#D72027', color: 'white' }}
            loading={loading}
            onClick={getDiscount}
          >
            Áp dụng
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={12}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Tổng tiền:
          </span>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#D72027',
              marginLeft: '0.8rem'
            }}
          >
            {formatPrice(getTotalPrice() * (discount?.value || 1))}
          </span>
          <span style={{ color: '#D72027', fontWeight: 'bold' }}> VND</span>
          <div style={{ fontWeight: 'bold' }}>
            {discount && (
              <>
                <span>{discount.label}: </span>
                <span
                  style={{
                    color: '#D72027',
                    fontSize: '1rem',
                    textDecorationLine: 'line-through'
                  }}
                >
                  {formatPrice(getTotalPrice())} VND
                </span>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Cart
