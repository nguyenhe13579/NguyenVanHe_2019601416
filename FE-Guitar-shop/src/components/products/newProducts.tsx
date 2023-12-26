import { useRouter } from 'next/router'

import { Badge, Button, Card, Col, Image, Row, Skeleton, Space } from 'antd'
import {
  CheckOutlined,
  HeartFilled,
  HeartOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { formatPrice } from '@/helpers/currency'
import { Product } from '@/types/product'
import useLocalStorage from '@/hooks/localStorage'

const { Meta } = Card

type Props = {
  products?: Product[]
  loading: boolean
  label: string
}

const NewProducts = (props: Props) => {
  const router = useRouter()
  const { products, loading, label } = props
  const [loveProducts, setLoveProducts] = useLocalStorage<Product[]>(
    'love-products',
    []
  )
  const [compareProducts, setCompareProducts] = useLocalStorage<Product[]>(
    'compare',
    []
  )

  const onCompare = (product: Product) => {
    if (!compareProducts.find(item => item.id === product.id)) {
      if (compareProducts.length === 3) {
        const tempProducts = [product].concat(compareProducts)
        setCompareProducts(tempProducts.slice(0, 3))
      } else setCompareProducts([...compareProducts, product])
      notificationSuccess('Thêm sản phẩm so sánh thành công')
    } else notificationError('Sản phẩm nay đã có trong danh sách')
  }

  const onDeleteCompare = (compareProduct: Product) => {
    setCompareProducts(
      compareProducts.filter(product => product.id !== compareProduct.id)
    )
    notificationSuccess('Xóa khỏi mục so sánh thành công!')
  }

  const onSelectLoveProduct = (loveProduct: Product) => {
    if (!loveProducts.find(product => product.id === loveProduct.id)) {
      setLoveProducts([...loveProducts, loveProduct])
      notificationSuccess('Thêm sản phẩm yêu thích thành công!')
    }
  }

  const onDeleteLoveProduct = (loveProduct: Product) => {
    setLoveProducts(
      loveProducts.filter(product => product.id !== loveProduct.id)
    )
    notificationSuccess('Xóa sản phẩm yêu thích thành công!')
  }

  const description = (loveProduct: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span
          style={{ color: '#D72027', fontSize: '1rem', fontWeight: 'bold' }}
        >
          <span>{formatPrice(loveProduct.price)}</span>
          <span style={{ fontSize: '0.8rem' }}> đ</span>
        </span>
        <span>
          {compareProducts.find(product => product.id === loveProduct.id) ? (
            <Button
              size="small"
              title='Đã có trong mục so sánh'
              style={{
                color: 'white',
                background: '#D72027'
              }}
              onClick={e => {
                e.stopPropagation()
                onDeleteCompare(loveProduct)
              }}
            >
              <CheckOutlined />
            </Button>
          ) : (
            <Button
              size="small"
              title="So sánh sản phẩm"
              onClick={e => {
                e.stopPropagation()
                onCompare(loveProduct)
              }}
            >
              <SwapOutlined />
            </Button>
          )}

          {loveProducts.find(product => product.id === loveProduct.id) ? (
            <Button
              size="small"
              title="Đã trong mục ưa thích"
              onClick={e => {
                e.stopPropagation()
                onDeleteLoveProduct(loveProduct)
              }}
            >
              <HeartFilled style={{ color: '#FF1935' }} />
            </Button>
          ) : (
            <Button
              size="small"
              title="Thêm vào mục ưa thích"
              onClick={e => {
                e.stopPropagation()
                onSelectLoveProduct(loveProduct)
              }}
            >
              <HeartOutlined style={{ color: '#FF1935' }} />
            </Button>
          )}
        </span>
      </div>
    )
  }

  return (
    <Row style={{ background: 'white', marginBottom: '2rem' }}>
      <Col
        xxl={{ span: 14, offset: 5 }}
        xl={{ span: 18, offset: 3 }}
        lg={{ span: 20, offset: 2 }}
        span={24}
        offset={0}
        style={{ padding: '0 1rem' }}
      >
        <div
          style={{
            marginBottom: '2rem',
            overflowX: 'scroll',
            background: '#F0F0F0'
          }}
        >
          {loading ? (
            <Skeleton active />
          ) : (
            <Space style={{ margin: '0.5rem' }}>
              {products &&
                products.map(product => (
                  <Badge.Ribbon
                    key={product.id}
                    text={label}
                    color={label === 'Hot' ? 'volcano' : 'green'}
                    style={{ display: 'flex' }}
                  >
                    <Card
                      size="small"
                      hoverable
                      style={{ width: 220 }}
                      cover={
                        <Image
                          preview={false}
                          alt="product"
                          src={product.image}
                        />
                      }
                      onClick={() => router.push(`/product/${product.id}`)}
                    >
                      <Meta
                        title={product.name}
                        description={description(product)}
                      />
                    </Card>
                  </Badge.Ribbon>
                ))}
            </Space>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default NewProducts
