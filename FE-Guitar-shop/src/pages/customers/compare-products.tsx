import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Col, Empty, Image, Popconfirm, Row } from 'antd'
import { CloseCircleFilled, RocketOutlined } from '@ant-design/icons'
import { NextPageWithLayout } from '@/types/next-page'
import { formatPrice } from '@/helpers/currency'
import { Product } from '@/types/product'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const cart = useLocalStorage<Cart[]>('cart', [])
  const [compareProducts, setCompareProducts] = useLocalStorage<Product[]>(
    'compare',
    []
  )

  const onDelete = (product: Product) => {
    const tempProducts = compareProducts.filter(item => item.id !== product.id)
    setProducts(tempProducts)
    setCompareProducts(tempProducts)
  }

  useEffect(() => {
    document.body.scrollTop = 600
    setProducts(compareProducts)
  }, [])

  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">So sánh sản phẩm</h2>
      {products.length > 0 ? (
        <Row style={{ background: 'white' }}>
          <Col
            xxl={{ span: 14, offset: 5 }}
            xl={{ span: 18, offset: 3 }}
            lg={{ span: 20, offset: 2 }}
            span={24}
            offset={0}
            style={{ padding: '0 1rem' }}
          >
            <table border={1} style={{ width: '100%', marginBottom: '4rem' }}>
              <tbody>
                <tr>
                  <td></td>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      <Image width={200} preview={false} src={product?.image} />

                      <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        {product?.name}
                      </div>
                      <div
                        style={{
                          color: '#D72027',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          marginBottom: '2rem'
                        }}
                      >
                        {formatPrice(product?.price)} đ
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Thương hiệu
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      {product?.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Quà tặng kèm
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      {product.bonus}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Xuất xứ
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      {product.origin}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Kiểu dáng
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      {product.style}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Nguyên liệu
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      {product.material}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Kiểu sơn
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      {product.paint}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Dây đàn
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      {product.string_name}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Đã bán
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      {product.sold}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    Thao tác
                  </th>
                  {products.map(product => (
                    <td
                      key={product.id}
                      style={{ textAlign: 'center', padding: '1rem' }}
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
                          cart[1]([
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
                      <div style={{ marginTop: '0.5rem' }}>
                        <Button
                          style={{ color: 'red' }}
                          onClick={() => onDelete(product)}
                        >
                          <CloseCircleFilled />
                          Xóa
                        </Button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      ) : (
        <div style={{ margin: '3rem' }}>
          <Empty description="Chưa có sản phẩm nào" />
        </div>
      )}
      {/* News and middle banner */}
      <BottomContent />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
