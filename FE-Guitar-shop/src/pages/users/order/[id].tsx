import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Table, notification } from 'antd'
import { OrderDetailResponse } from '@/types/order'
import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { notificationError } from '@/helpers/notification'
import { OrderService } from '@/services/order'

import { orderDetailColumns } from '@/components/utilities/columnsConfig'
import User from '@/components/layouts/user'

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
    if (orderID) fetchOrderDetails()
  }, [router])

  return (
    <div
      style={{
        margin: '10px 20px',
        background: '#fff',
        padding: '10px 10px',
        borderRadius: '6px'
      }}
    >
      <div
        style={{
          color: '#1677FF',
          margin: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          paddingBottom: '1rem',
          borderBottomColor: '#F5F5F5',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          fontSize: '0.9rem',
          fontFamily: 'sans-serif'
        }}
      >
        <MenuUnfoldOutlined />
        <div>Chi tiết đơn hàng #{orderID}</div>
      </div>
      <Table
        columns={orderDetailColumns}
        dataSource={orderDetail}
        pagination={false}
        rowKey="id"
        loading={loading}
      />
      <div>
        <Button
          style={{ background: '#D72027', color: 'white', marginTop: '1rem' }}
          onClick={() => router.push('/users/order')}
        >
          Quay lại
        </Button>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
