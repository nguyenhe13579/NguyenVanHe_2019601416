import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Col, Row, Table, notification } from 'antd'
import { OrderDetailResponse } from '@/types/order'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { OrderService } from '@/services/order'

import { orderDetailColumns } from '@/components/utilities/columnsConfig'
import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const orderID = router.query.id
  const [orderDetail, setOrderDetail] = useState<OrderDetailResponse[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const response = await OrderService.getOrderDetailByID({
        order_id: orderID
      })
      if (response) setOrderDetail(response)
    } catch {
      notification.destroy()
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.body.scrollTop = 600
    if (orderID) fetchOrderDetails()
  }, [router])

  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Chi tiết đơn hàng #{orderID}</h2>
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 20, offset: 2 }}
          span={24}
          offset={0}
          style={{ padding: '0 1rem' }}
        >
          <Table
            columns={orderDetailColumns}
            dataSource={orderDetail}
            pagination={false}
            rowKey="id"
            loading={loading}
          />
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              style={{
                marginBottom: '4rem',
                marginTop: '4rem',
                background: '#D72027',
                color: 'white'
              }}
              onClick={() => router.push('/customers/orders')}
            >
              Quay lại
            </Button>
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
