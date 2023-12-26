import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Card,
  Col,
  Empty,
  Image,
  Input,
  Pagination,
  Row,
  Slider,
  Spin
} from 'antd'
import {
  CheckOutlined,
  HeartFilled,
  HeartOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { ListPayload, Product } from '@/types/product'
import { NextPageWithLayout } from '@/types/next-page'
import { defaultPagination } from '@/configs/pagination'
import { ProductService } from '@/services/product'
import { productFilter } from '@/configs/selectOptions'
import { formatPrice } from '@/helpers/currency'
import useLocalStorage from '@/hooks/localStorage'

import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import SideSort from '@/components/filters/sideSort'
import Landing from '@/components/layouts/landing'

const { Meta } = Card

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const categoryID = router.query.id?.toString()
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])

  const [page, setPage] = useState<number>(defaultPagination.page)
  const [total, setTotal] = useState<number>(defaultPagination.total)

  const [sortString, setSortString] = useState<string>('desc')
  const [sortField, setSortField] = useState<string>('products.created_at')
  const [search, setSearch] = useState<string>()
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000000])

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

  const fetchProductByID = async () => {
    try {
      setLoading(true)
      const payload: ListPayload = {
        page: page,
        pageSize: 6,
        categoryID: parseInt(categoryID || '1'),
        status: 1,
        name: search,
        sortField: sortField,
        sortOrder: sortString,
        fromPrice: priceRange[0],
        toPrice: priceRange[1]
      }
      const response = await ProductService.getList(payload)
      if (response) {
        setProducts(response.products || [])
        setTotal(response.total)
        setPage(response.page)
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
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
              title="Đã có trong mục so sánh"
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

  useEffect(() => {
    document.body.scrollTop = 600
    if (categoryID) fetchProductByID()
  }, [router, page])

  return (
    <>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Danh sách sản phẩm</h2>
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 20, offset: 2 }}
          span={24}
          offset={0}
          style={{ padding: '0 1rem' }}
        >
          <Row>
            <Col span={6}>
              {/* Filters */}
              <div
                style={{
                  marginTop: '3rem',
                  border: '1px solid #E8EAED',
                  padding: '1rem'
                }}
              >
                <div>
                  <div className="small-title">
                    <h4>Tên/hãng:</h4>
                  </div>
                  <Input
                    allowClear={true}
                    placeholder="Nhập tên/hãng"
                    onBlur={e => setSearch(e.target.value)}
                  />
                </div>
                <div>
                  <div className="small-title" style={{ marginTop: '0.6rem' }}>
                    <h4>Giá tiền:</h4>
                  </div>
                  <Slider
                    range
                    defaultValue={[0, 5000000]}
                    max={10000000}
                    step={500000}
                    min={0}
                    onChange={setPriceRange}
                    style={{ color: 'blue' }}
                    tooltip={{ formatter: value => formatPrice(value || 0) }}
                    marks={{
                      0: '0đ',
                      5000000: '5tr',
                      10000000: '10tr'
                    }}
                  />
                </div>
                <div>
                  <div className="small-title">
                    <h4>Sắp xếp:</h4>
                  </div>
                  <SideSort
                    sortString={sortString}
                    options={productFilter}
                    onSortField={setSortField}
                    onSorting={setSortString}
                  />
                </div>
                <Button
                  onClick={fetchProductByID}
                  style={{
                    background: '#D72027',
                    color: 'white',
                    width: '100%'
                  }}
                >
                  Tìm kiếm
                </Button>
              </div>
            </Col>
            <Col span={18}>
              {/* Products */}
              <Spin spinning={loading}>
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
                  {products.length > 0 ? (
                    products.map(product => (
                      <Card
                        key={product.id}
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
                    ))
                  ) : (
                    <Empty description="Không có sản phẩm nào" />
                  )}
                </div>
              </Spin>
            </Col>
          </Row>
          {/* Paginate */}
          <Row>
            <Col offset={6} style={{ marginTop: '2rem' }}>
              <Pagination
                defaultCurrent={1}
                pageSize={6}
                current={page}
                total={total}
                onChange={page => setPage(page)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Middle Banner & news */}
      <BottomContent />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
