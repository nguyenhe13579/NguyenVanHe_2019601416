import { ReactElement, useEffect, useState } from 'react'

import { CloseCircleFilled, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Card, Col, Empty, Image, Row } from 'antd'
import { notificationSuccess } from '@/helpers/notification'
import { NextPageWithLayout } from '@/types/next-page'
import { formatPrice } from '@/helpers/currency'
import { useRouter } from 'next/router'
import { Product } from '@/types/product'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const { Meta } = Card

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [loveProducts, setLoveProducts] = useState<Product[]>([])
  const products = useLocalStorage<Product[]>('love-products', [])
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', [])

  useEffect(() => {
    document.body.scrollTop = 600
    setLoveProducts(products[0])
  }, [])

  const onAddToCart = (product: Product) => {
    if (!cart.find(productCart => productCart.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1, total: product.price }])
      notificationSuccess('Thêm vào giỏ hàng thành công!')
    } else {
      const temProducts = cart.map(obj => {
        if (product.id === obj.id && product.amount > (obj.quantity || 0))
          return {
            ...obj,
            quantity: (obj.quantity || 1) + 1,
            total: ((obj.quantity || 1) + 1) * obj.price
          }
        return obj
      })
      setCart(temProducts)
      notificationSuccess('Đã tăng 1 số lượng trong giỏ hàng')
    }
  }

  const onDeleteLoveProduct = (loveProduct: Product) => {
    setLoveProducts(
      loveProducts.filter(product => product.id !== loveProduct.id)
    )
    products[1](loveProducts.filter(product => product.id !== loveProduct.id))
    notificationSuccess('Xóa sản phẩm yêu thích thành công!')
  }

  const description = (loveProduct: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span
          style={{ color: '#D72027', fontSize: '1rem', fontWeight: 'bold' }}
        >
          <span>{formatPrice(loveProduct.price)}</span>
          <span style={{ fontSize: '0.8rem' }}> VND</span>
        </span>
        <span>
          <Button
            size="small"
            title="Thêm vào giỏ hàng"
            onClick={e => {
              e.stopPropagation()
              onAddToCart(loveProduct)
            }}
          >
            <ShoppingCartOutlined style={{ color: '#1677FF' }} />
          </Button>
          <Button
            size="small"
            title="Xóa khỏi mục ưa thích"
            onClick={e => {
              e.stopPropagation()
              onDeleteLoveProduct(loveProduct)
            }}
          >
            <CloseCircleFilled style={{ color: '#FF1935' }} />
          </Button>
        </span>
      </div>
    )
  }

  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Sản phẩm yêu thích</h2>
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 20, offset: 2 }}
          span={24}
          offset={0}
          style={{ padding: '0 1rem' }}
        >
          {/* Products */}
          <div
            style={{
              color: '#00264D',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              justifyContent: 'center',
              marginTop: '3rem'
            }}
          >
            {loveProducts.length > 0 ? (
              loveProducts.map(product => (
                <Card
                  key={product.id}
                  size="small"
                  hoverable
                  style={{ width: 220 }}
                  cover={
                    <Image preview={false} alt="product" src={product.image} />
                  }
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <Meta
                    title={product.name}
                    description={description(product)}
                  />
                </Card>
              ))
            ) : (
              <Empty description="Không có sản phẩm nào" />
            )}
          </div>
        </Col>
      </Row>
      <BottomContent />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
