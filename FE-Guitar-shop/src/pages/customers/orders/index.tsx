import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Col, Row, Table, notification } from 'antd'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { OrderService } from '@/services/order'
import { UserInfo } from '@/types/user'
import { Order } from '@/types/order'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

import { orderColumns } from '@/components/utilities/columnsConfig'
import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const userLocal = useLocalStorage<UserInfo>('user', null)
  const userSession = useSessionStorage<UserInfo>('user', null)
  const [user, setUser] = useState<UserInfo | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const orders = await OrderService.getOrderByUser({
        user_id: user?.id || 1
      })
      if (orders) setOrders(orders)
    } catch (error: unknown) {
      notification.destroy()
      notificationError('Bạn không có đơn hàng nào')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.body.scrollTop = 600
    setUser(userLocal[0] || userSession[0])
  }, [])

  useEffect(() => {
    if (user) fetchOrders()
  }, [user])

  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Danh sách đơn hàng</h2>
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
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '4rem'
            }}
          >
            <Table
              columns={orderColumns}
              dataSource={orders}
              pagination={false}
              rowKey="id"
              loading={loading}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              style={{
                marginBottom: '4rem',
                background: '#D72027',
                color: 'white'
              }}
              onClick={() => router.push('/')}
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
