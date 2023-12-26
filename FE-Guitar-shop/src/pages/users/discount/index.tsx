import { ReactElement, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { MenuUnfoldOutlined, PlusOutlined } from '@ant-design/icons'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { DiscountService } from '@/services/discount'
import { Button, Table } from 'antd'
import { Discount } from '@/types/discount'

import { discountColumns } from '@/components/utilities/columnsConfig'
import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const shouldEffect = useRef(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [discounts, setDiscounts] = useState<Discount[]>([])

  const fetchDiscounts = async () => {
    try {
      setLoading(true)
      const response = await DiscountService.getList()
      if (response) setDiscounts(response.discounts)
    } catch {
      notificationError('Không có mã giảm giá nào')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (shouldEffect.current) fetchDiscounts()
    shouldEffect.current = false
  }, [])

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
        <div>Danh sách mã giảm giá</div>
      </div>
      {/* Create new */}
      <div>
        <Button
          style={{
            marginBottom: '1rem',
            marginLeft: '1rem',
            background: '#1677FF',
            color: 'white'
          }}
          onClick={() => router.push('/users/discount/create')}
        >
          <PlusOutlined />
          Thêm mới
        </Button>
      </div>
      <Table
        columns={discountColumns}
        dataSource={discounts}
        pagination={false}
        rowKey="id"
        loading={loading}
      />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
