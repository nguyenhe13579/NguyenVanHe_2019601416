import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Col,
  Empty,
  Image,
  Popconfirm,
  Rate,
  Row,
  Space,
  Spin
} from 'antd'
import {
  DollarCircleFilled,
  GiftFilled,
  RocketOutlined,
  RotateRightOutlined,
  SendOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { RatingPayload, ScoreResponse } from '@/types/rating'
import { ListPayload, Product } from '@/types/product'
import { NextPageWithLayout } from '@/types/next-page'
import { ProductService } from '@/services/product'
import { RatingService } from '@/services/rating'
import { formatPrice } from '@/helpers/currency'
import { UserInfo } from '@/types/user'
import { Cart } from '@/types/cart'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

import BottomContent from '@/components/base/bottomContent'
import NewProducts from '@/components/products/newProducts'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const productID = router.query.id?.toString()
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState<boolean>(false)
  const [suggestBrandLoading, setSuggestBrandLoading] = useState<boolean>(false)
  const [suggestPriceLoading, setSuggestPriceLoading] = useState<boolean>(false)
  const [sameBrandProducts, setSameBrandProducts] = useState<Product[]>([])
  const [samePriceProducts, setSamePriceProducts] = useState<Product[]>([])
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', [])
  const [score, setScore] = useState<ScoreResponse>()
  const [stars, setStars] = useState<number>(0)
  const userLocal = useLocalStorage<UserInfo>('user', null)
  const userSession = useSessionStorage<UserInfo>('user', null)

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

  const fetchSameBrandProducts = async () => {
    try {
      setSuggestBrandLoading(true)
      const payload: ListPayload = {
        id: product?.id,
        status: 1,
        page: 1,
        brand: product?.brand,
        pageSize: 10
      }
      const response = await ProductService.getList(payload)
      if (response) {
        setSameBrandProducts(response.products || [])
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setSuggestBrandLoading(false)
    }
  }

  const fetchSamePriceProducts = async () => {
    try {
      setSuggestPriceLoading(true)
      const payload: ListPayload = {
        id: product?.id,
        status: 1,
        page: 1,
        price: product?.price,
        pageSize: 10
      }
      const response = await ProductService.getList(payload)
      if (response) {
        setSamePriceProducts(response.products || [])
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setSuggestPriceLoading(false)
    }
  }

  const fetchProductByID = async () => {
    try {
      setLoading(true)
      const response = await ProductService.show(parseInt(productID || '0'))
      if (response) setProduct(response)
    } catch {
      notificationError('Không tìm thấy sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const getScore = async () => {
    try {
      const payload: RatingPayload = {
        product_id: product?.id || 0,
        user_id: userLocal[0]?.id || userSession[0]?.id
      }
      const response = await RatingService.detail(payload)
      if (response) setScore(response)
    } catch {
      notificationError('Có lỗi xảy ra')
    }
  }

  const onRating = async () => {
    try {
      if (stars === 0) notificationError('Vui lòng chọn số sao')
      else {
        const payload: RatingPayload = {
          product_id: product?.id || 0,
          user_id: userLocal[0]?.id || userSession[0]?.id,
          score: stars
        }
        if (await RatingService.create(payload))
          notificationSuccess('Cám ơn bạn đã đánh giá sản phẩm')
      }
    } catch {
      notificationError('Gửi đánh giá thất bại')
    }
  }

  useEffect(() => {
    document.body.scrollTop = 600
    if (productID) fetchProductByID()
  }, [router])

  useEffect(() => {
    if (product) {
      fetchSameBrandProducts()
      fetchSamePriceProducts()
      getScore()
    }
  }, [product])

  return (
    <>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">chi tiết sản phẩm #{productID}</h2>
      <Row style={{ background: 'white', marginBottom: '4rem' }}>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 20, offset: 2 }}
          span={24}
          offset={0}
          style={{ padding: '0 1rem' }}
        >
          {/* Products */}
          <Spin spinning={loading}>
            <div
              style={{
                color: '#00264D',
                marginTop: '3rem'
              }}
            >
              {product ? (
                <Row>
                  {/* Image */}
                  <Col span={10}>
                    <Image
                      alt="product"
                      src={product.image}
                      preview={false}
                      style={{
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: '#E5E5E5'
                      }}
                    />
                  </Col>
                  <Col span={14}>
                    {/* Product name */}
                    <div style={{ marginLeft: '2rem' }}>
                      <div>
                        <span style={{ fontSize: '2rem' }}>{product.name}</span>{' '}
                        <span style={{ fontWeight: 'bold', color: '#D72027' }}>
                          {product.amount > 0 ? `(Còn hàng: ${product.amount})` : '(Hết hàng)'}
                        </span>
                      </div>
                      {score ? (
                        // Rating
                        <Space>
                          {score.rated.length === 0 ? (
                            <>
                              <Rate
                                allowHalf
                                onChange={total => setStars(total)}
                              />
                              <Popconfirm
                                title="Thông báo"
                                description="Bạn có chắc muốn đánh giá sản phẩm này?"
                                onConfirm={onRating}
                                disabled={!userLocal[0] && !userSession[0]}
                                okText="Đồng ý"
                                cancelText="Đóng"
                              >
                                <Button
                                  size="small"
                                  style={{
                                    color: 'white',
                                    background: '#D92930'
                                  }}
                                  disabled={!userLocal[0] && !userSession[0]}
                                >
                                  Đánh giá
                                </Button>
                              </Popconfirm>
                            </>
                          ) : (
                            <Rate allowHalf value={parseFloat(score.score)} />
                          )}
                          <span>
                            <span className="label-info">Đánh giá:</span>{' '}
                            <span className="product-info">
                              {parseFloat(score.score) || 0} / 5
                            </span>{' '}
                            (<span className="label-info">Tổng:</span>{' '}
                            <span className="product-info">{score.total}</span>)
                          </span>
                        </Space>
                      ) : (
                        <Spin size="small" />
                      )}
                      {/* Price */}
                      <div>
                        <Space>
                          <DollarCircleFilled
                            style={{ color: '#FFA800', fontSize: '1rem' }}
                          />
                          <span className="label-info">Giá bán:</span>
                        </Space>
                        <span
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#BF081D'
                          }}
                        >
                          {' '}
                          {formatPrice(product.price)} đ
                        </span>
                      </div>
                      <div>
                        <div
                          style={{
                            gap: '0.5rem',
                            display: 'flex',
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          <GiftFilled
                            style={{ color: '#D72027', fontSize: '1rem' }}
                          />
                          <span className="label-info">Quà tặng kèm thêm:</span>
                        </div>
                        <div className="product-info"> - {product.bonus}</div>
                      </div>
                      <div>
                        <Space
                          style={{
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          <SendOutlined style={{ fontSize: '1rem' }} />
                          Thông số:
                        </Space>
                        <div>
                          - <span className="label-info">Xuất xứ:</span>{' '}
                          <span className="product-info">{product.origin}</span>
                        </div>
                        <div>
                          - <span className="label-info">Hãng:</span>{' '}
                          <span className="product-info">{product.brand}</span>
                        </div>
                        {product.style && (
                          <>
                            <div>
                              - <span className="label-info">Kiểu dáng:</span>{' '}
                              <span className="product-info">
                                {product.style}
                              </span>
                            </div>
                            <div>
                              - <span className="label-info">Chất liệu:</span>{' '}
                              <span className="product-info">
                                {product.material}
                              </span>
                            </div>
                            <div>
                              - <span className="label-info">Loại sơn:</span>{' '}
                              <span className="product-info">
                                {product.paint}
                              </span>
                            </div>
                            <div>
                              - <span className="label-info">Dây đàn:</span>{' '}
                              <span className="product-info">
                                {product.string_name}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      <Space
                        style={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          marginTop: '0.5rem',
                          marginBottom: '0.2rem',
                          color: '#FFA800'
                        }}
                      >
                        <RocketOutlined />
                        Đổi trả thoải mái trong 3 ngày đầu tiên nhận hàng
                      </Space>
                      <Space
                        style={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#FFA800',
                          marginBottom: '1rem'
                        }}
                      >
                        <RotateRightOutlined />
                        Hoàn tiền 100% nếu khách hàng phát hiện hàng giả, hàng
                        nhái
                      </Space>
                      <div>
                        <Button
                          style={{ color: 'white', background: '#0080FF' }}
                          onClick={() => onAddToCart(product)}
                        >
                          <ShoppingCartOutlined />
                          Thêm vào giỏ hàng
                        </Button>
                      </div>
                      <div
                        style={{
                          marginTop: '0.5rem',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <Popconfirm
                          title="Cảnh báo"
                          description={
                            <div>
                              Hành động này sẽ xóa hết giỏ hàng của bạn trước
                              <br />
                              đó, bạn có chắc muốn đặt mua sản phẩm này?
                            </div>
                          }
                          onConfirm={() => {
                            setCart([
                              { ...product, quantity: 1, total: product.price }
                            ])
                            router.push('/customers/cart')
                          }}
                          okText="Đồng ý"
                          cancelText="Đóng"
                        >
                          <Button
                            style={{ color: 'white', background: '#D72027' }}
                          >
                            <RocketOutlined />
                            Mua ngay
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Empty />
              )}
            </div>
          </Spin>
        </Col>
      </Row>
      {sameBrandProducts.length > 0 && (
        <div
          style={{
            color: '#00264D'
          }}
        >
          <h2 className="homepage-title">Sản phẩm cùng hãng</h2>
          <NewProducts
            loading={suggestBrandLoading}
            products={sameBrandProducts}
            label={product?.brand || 'New'}
          />
        </div>
      )}
      {samePriceProducts.length > 0 && (
        <div
          style={{
            color: '#00264D'
          }}
        >
          <h2 className="homepage-title">Sản phẩm trong khoảng giá</h2>
          <NewProducts
            loading={suggestPriceLoading}
            products={samePriceProducts}
            label="Hot"
          />
        </div>
      )}
      <BottomContent />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
