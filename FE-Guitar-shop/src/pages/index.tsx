import { ReactElement, useEffect, useRef, useState } from 'react'

import { ListPayload, Product } from '@/types/product'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { ProductService } from '@/services/product'

import BottomContent from '@/components/base/bottomContent'
import NewProducts from '@/components/products/newProducts'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const shouldEffect = useRef(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>()
  const [hotProducts, setHotProducts] = useState<Product[]>()

  const fetchProducts = async (hotProducts: boolean) => {
    try {
      setLoading(true)
      const payload: ListPayload = {
        status: 1,
        page: 1,
        pageSize: 10
      }
      const response = await ProductService.getList(
        hotProducts ? { ...payload, sortField: 'sold' } : payload
      )
      if (response) {
        hotProducts
          ? setHotProducts(response.products)
          : setProducts(response.products)
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.body.scrollTop = 0
    if (shouldEffect.current) {
      fetchProducts(true)
      fetchProducts(false)
    }
    shouldEffect.current = false
  }, [])

  return (
    <>
      {/* Banner */}
      <TopBanners />
      {/* New products */}
      <div
        style={{
          color: '#00264D'
        }}
      >
        <h2 className="homepage-title">Sản phẩm mới nhất</h2>
        <NewProducts loading={loading} products={products} label="New" />
      </div>
      {/* Hot products */}
      <div
        style={{
          color: '#00264D'
        }}
      >
        <h2 className="homepage-title">Sản phẩm bán chạy</h2>
        <NewProducts loading={loading} products={hotProducts} label="Hot" />
      </div>
      <BottomContent />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
